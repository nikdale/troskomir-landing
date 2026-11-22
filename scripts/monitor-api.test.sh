#!/usr/bin/env bash
# Offline self-test for scripts/monitor-api.sh: a throwaway certificate, a
# local HTTPS server on 127.0.0.1 and one case per way the monitor must fail.
# Nothing here touches the network beyond the loopback interface.
#
# Run: bash scripts/monitor-api.test.sh   (needs bash, curl, jq, openssl, python3)
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
MONITOR="$HERE/monitor-api.sh"
WORK="$(mktemp -d)"
SERVER_PID=""
# shellcheck disable=SC2317 # called through the trap
cleanup() {
  if [[ -n "$SERVER_PID" ]]; then kill "$SERVER_PID" 2>/dev/null || true; fi
  rm -rf "$WORK"
}
trap cleanup EXIT

# A self-signed localhost certificate valid for 30 days.
openssl req -x509 -newkey ec -pkeyopt ec_paramgen_curve:prime256v1 -nodes \
  -keyout "$WORK/key.pem" -out "$WORK/cert.pem" -days 30 \
  -subj "/CN=localhost" -addext "subjectAltName=DNS:localhost" 2>/dev/null
PIN=$(openssl x509 -noout -pubkey -in "$WORK/cert.pem" | openssl pkey -pubin -outform der \
  | openssl dgst -sha256 -binary | base64)

# The server answers /api/health with whatever $WORK/status and $WORK/body hold
# at the time of the request, so each case below just rewrites those files.
cat >"$WORK/server.py" <<'PY'
import http.server, ssl, sys, pathlib
work = pathlib.Path(sys.argv[1])
class Handler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        status = int((work / "status").read_text().strip())
        body = (work / "body").read_bytes()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)
    def log_message(self, *args):
        pass
server = http.server.HTTPServer(("127.0.0.1", 0), Handler)
ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ctx.load_cert_chain(work / "cert.pem", work / "key.pem")
server.socket = ctx.wrap_socket(server.socket, server_side=True)
(work / "port").write_text(str(server.server_address[1]))
server.serve_forever()
PY
echo 200 >"$WORK/status"
echo '{"status":"ok","timestamp":"2026-01-01T00:00:00.000Z","db":"ok","redis":"ok"}' >"$WORK/body"
python3 "$WORK/server.py" "$WORK" &
SERVER_PID=$!
for _ in $(seq 50); do [[ -s "$WORK/port" ]] && break; sleep 0.1; done
PORT=$(cat "$WORK/port")

export MONITOR_HOST=localhost MONITOR_PORT="$PORT" MONITOR_CA_FILE="$WORK/cert.pem"
export MONITOR_HEALTH_URL="https://localhost:${PORT}/api/health"
export MONITOR_PINS="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA= $PIN"
export MONITOR_MIN_DAYS=21 MONITOR_ATTEMPTS=1 MONITOR_RETRY_DELAY=0 MONITOR_TIMEOUT=5

failed=0
expect() { # expect <exit code> <name> [VAR=value ...]
  local want="$1" name="$2" got=0 out
  shift 2
  out=$(env "$@" bash "$MONITOR" 2>&1) || got=$?
  if [[ "$got" == "$want" ]]; then
    echo "ok   - $name"
  else
    echo "FAIL - $name: exit $got, wanted $want"
    while IFS= read -r line; do echo "       $line"; done <<<"$out"
    failed=1
  fi
}
respond() { echo "$1" >"$WORK/status"; echo "$2" >"$WORK/body"; }

respond 200 '{"status":"ok","timestamp":"x","db":"ok","redis":"ok"}'
expect 0 "healthy API, valid certificate, pinned key"
expect 0 "the second pin is accepted as well" MONITOR_PINS="$PIN AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
expect 1 "a key that is not pinned fails" MONITOR_PINS="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
expect 1 "a certificate inside the expiry window fails" MONITOR_MIN_DAYS=40

respond 503 '{"status":"error","db":"down","redis":"ok"}'
expect 1 "HTTP 503 fails"
respond 200 '{"status":"ok","timestamp":"x","db":"down","redis":"ok"}'
expect 1 "a down database fails even with HTTP 200"
respond 200 '{"status":"ok","timestamp":"x","db":"ok","redis":"ok","mail":"down"}'
expect 1 "a component added later (mail) is checked too"
respond 200 '{"status":"ok","timestamp":"x","db":"ok","redis":"ok","mail":"ok"}'
expect 0 "a healthy added component passes"
respond 200 'not json'
expect 1 "a body that is not JSON fails"

respond 200 '{"status":"ok","timestamp":"x","db":"ok","redis":"ok"}'
expect 1 "nothing listening fails" MONITOR_PORT=1 MONITOR_HEALTH_URL="https://localhost:1/api/health"
expect 2 "a bad setting is a usage error" MONITOR_MIN_DAYS=soon

# The retry: the first round fails, the server recovers before the second.
respond 503 '{"status":"error"}'
( sleep 1; respond 200 '{"status":"ok","timestamp":"x","db":"ok","redis":"ok"}' ) &
RECOVER_PID=$!
expect 0 "one failed round followed by a good one does not page" MONITOR_ATTEMPTS=2 MONITOR_RETRY_DELAY=2
wait "$RECOVER_PID" # not a bare `wait`: that would also wait for the server

exit "$failed"
