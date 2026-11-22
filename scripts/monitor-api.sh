#!/usr/bin/env bash
# External check of the production API, run from GitHub's hosted runners by
# .github/workflows/api-monitor.yml every 15 minutes.
#
# Why it lives here: every other alert path (the backup cron, the pin-guard
# hook, the daily certificate-pin workflow on the self-hosted runner) runs in
# the same home lab as the API. A dead VM, a power cut or an ISP outage takes
# the alarm down with the thing it watches. This repository is public, so its
# hosted runners cost nothing, and a failed scheduled run e-mails the owner.
#
# Three checks, all against public values only:
#   1. GET /api/health answers 200 with status, db and redis "ok" (and mail,
#      once the backend reports it).
#   2. The served certificate does not expire within MONITOR_MIN_DAYS days.
#   3. The served leaf's SPKI SHA-256 is one of the pins the mobile app ships
#      (troskomir-mobile lib/services/certificate_pinning.dart). A key that is
#      not pinned locks every installed app out, so this must page.
#
# A failing round is retried (MONITOR_ATTEMPTS rounds, MONITOR_RETRY_DELAY
# seconds apart) so one dropped packet does not page anyone. Exit 0 when a
# round passes, 1 when every round failed, 2 on a usage or tooling error.
#
# Every setting can be overridden through the environment; the self-test
# (scripts/monitor-api.test.sh) uses that to point it at a local TLS server.
set -uo pipefail

HOST="${MONITOR_HOST:-api.troskomir.stryna.com}"
PORT="${MONITOR_PORT:-443}"
HEALTH_URL="${MONITOR_HEALTH_URL:-https://${HOST}/api/health}"
# Base64 SHA-256 of the DER SubjectPublicKeyInfo, space-separated: the live key
# and the offline backup key. Keep in step with certificate_pinning.dart.
PINS="${MONITOR_PINS:-3ug968fsS04fcG9f4JxDOWT3V0NCUjViYGwKVbZRiBU= eL/FUBFtd9nt2RR2iUhX+pKgZoQqO09fBs5TigyxBps=}"
MIN_DAYS="${MONITOR_MIN_DAYS:-21}"
ATTEMPTS="${MONITOR_ATTEMPTS:-2}"
RETRY_DELAY="${MONITOR_RETRY_DELAY:-60}"
TIMEOUT="${MONITOR_TIMEOUT:-20}"
# Only for the self-test: trust a local CA instead of the system store.
CA_FILE="${MONITOR_CA_FILE:-}"

for tool in curl jq openssl base64 timeout; do
  command -v "$tool" >/dev/null 2>&1 || { echo "::error::$tool is not installed"; exit 2; }
done
[[ "$MIN_DAYS" =~ ^[0-9]+$ && "$ATTEMPTS" =~ ^[1-9][0-9]*$ && "$RETRY_DELAY" =~ ^[0-9]+$ ]] || {
  echo "::error::MONITOR_MIN_DAYS, MONITOR_ATTEMPTS and MONITOR_RETRY_DELAY must be whole numbers"
  exit 2
}

failures=()
fail() { failures+=("$1"); }

check_health() {
  local body status curl_args=(--silent --show-error --max-time "$TIMEOUT" --output - --write-out '\n%{http_code}')
  [[ -n "$CA_FILE" ]] && curl_args+=(--cacert "$CA_FILE")
  if ! body=$(curl "${curl_args[@]}" "$HEALTH_URL" 2>&1); then
    fail "health: request failed: ${body//$'\n'/ }"
    return
  fi
  status="${body##*$'\n'}"
  body="${body%$'\n'*}"
  if [[ "$status" != "200" ]]; then
    fail "health: HTTP $status: ${body:0:300}"
    return
  fi
  # status, db and redis must be "ok"; any other component the backend adds
  # later (mail) must be "ok" too when present. timestamp is informational.
  if ! jq -e '
      (.status == "ok") and (.db == "ok") and (.redis == "ok")
      and ([to_entries[] | select(.key != "timestamp" and (.value | type) == "string") | .value == "ok"] | all)
    ' >/dev/null 2>&1 <<<"$body"; then
    fail "health: unhealthy body: ${body:0:300}"
    return
  fi
  echo "health: ok ${body:0:300}"
}

check_certificate() {
  local cert spki pin pin_ok=false not_after
  # -servername for SNI: the edge serves many sites from one address.
  if ! cert=$(timeout "$TIMEOUT" openssl s_client -connect "${HOST}:${PORT}" -servername "$HOST" \
      </dev/null 2>/dev/null | openssl x509 -outform PEM 2>/dev/null) \
      || [[ -z "$cert" ]]; then
    fail "tls: no certificate from ${HOST}:${PORT}"
    return
  fi

  not_after=$(openssl x509 -noout -enddate <<<"$cert" | cut -d= -f2)
  if openssl x509 -noout -checkend $(( MIN_DAYS * 86400 )) <<<"$cert" >/dev/null; then
    echo "tls: certificate valid until ${not_after} (more than ${MIN_DAYS} days)"
  else
    fail "tls: certificate expires ${not_after}, within ${MIN_DAYS} days (renewal stuck?)"
  fi

  spki=$(openssl x509 -noout -pubkey <<<"$cert" | openssl pkey -pubin -outform der 2>/dev/null \
    | openssl dgst -sha256 -binary | base64)
  for pin in $PINS; do
    [[ "$spki" == "$pin" ]] && pin_ok=true
  done
  if $pin_ok; then
    echo "tls: served key ${spki} is pinned by the app"
  else
    fail "tls: served key ${spki} is NOT one of the app's pins (${PINS}); installed apps cannot connect"
  fi
}

for (( attempt = 1; attempt <= ATTEMPTS; attempt++ )); do
  failures=()
  echo "== round ${attempt}/${ATTEMPTS} against ${HOST}"
  check_health
  check_certificate
  if (( ${#failures[@]} == 0 )); then
    echo "All checks passed."
    exit 0
  fi
  for f in "${failures[@]}"; do echo "FAILED $f"; done
  if (( attempt < ATTEMPTS )); then
    echo "Retrying in ${RETRY_DELAY}s."
    sleep "$RETRY_DELAY"
  fi
done

for f in "${failures[@]}"; do echo "::error::$f"; done
exit 1
