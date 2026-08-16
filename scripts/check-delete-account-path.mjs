#!/usr/bin/env node
/**
 * Smoke-checks the account-deletion path the stores actually click.
 *
 * `/delete-account/` is the only page on this site that talks to the API, and
 * Play verifies the deletion flow by visiting it. A CORS regression or a
 * backend route rename breaks a store requirement in a way nothing else here
 * would notice — the page still builds, still deploys, and simply stops
 * working.
 *
 * Deliberately side-effect free. It does not register an account, request a
 * real deletion code, or send anyone mail: it sends the CORS preflight the
 * browser sends before each POST, and asserts the API both answers and
 * allows this origin. That is exactly the layer that silently breaks, and
 * running it on a schedule against production is safe because it changes
 * nothing.
 *
 * Usage: node scripts/check-delete-account-path.mjs [apiBase] [origin]
 */
const API_BASE =
  process.argv[2] ?? 'https://api.troskomir.stryna.com/api';
const ORIGIN = process.argv[3] ?? 'https://troskomir.stryna.com';

// The two the page posts to — see src/components/DeleteAccount.astro.
const PATHS = ['/account-deletion/request', '/account-deletion/confirm'];

let failed = false;

function fail(message) {
  console.error(`  FAIL  ${message}`);
  failed = true;
}

for (const path of PATHS) {
  const url = `${API_BASE}${path}`;
  let response;
  try {
    response = await fetch(url, {
      method: 'OPTIONS',
      headers: {
        Origin: ORIGIN,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'content-type',
      },
      signal: AbortSignal.timeout(15000),
    });
  } catch (error) {
    fail(`${path} — request failed: ${error.message}`);
    continue;
  }

  if (response.status >= 400) {
    fail(`${path} — preflight returned ${response.status}`);
    continue;
  }

  const allowOrigin = response.headers.get('access-control-allow-origin');
  if (allowOrigin !== ORIGIN && allowOrigin !== '*') {
    fail(
      `${path} — CORS does not allow ${ORIGIN} ` +
        `(access-control-allow-origin: ${allowOrigin ?? 'absent'})`,
    );
    continue;
  }

  const allowMethods =
    response.headers.get('access-control-allow-methods') ?? '';
  if (!/post/i.test(allowMethods) && allowMethods !== '') {
    fail(`${path} — POST not in access-control-allow-methods: ${allowMethods}`);
    continue;
  }

  // The preflight alone proves CORS, not that the route exists — a global
  // OPTIONS handler answers 204 for any path, including a misspelt one, which
  // would let a route rename slip through. So also POST a deliberately
  // invalid body: a real route rejects it with a 4xx from the validation
  // pipe, a missing one answers 404. Still side-effect free — the payload
  // never passes validation, so no code is generated and no mail is sent.
  let probe;
  try {
    probe = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: ORIGIN },
      body: JSON.stringify({ email: 'not-an-email', code: '' }),
      signal: AbortSignal.timeout(15000),
    });
  } catch (error) {
    fail(`${path} — POST probe failed: ${error.message}`);
    continue;
  }

  if (probe.status === 404) {
    fail(`${path} — route does not exist (404). Renamed or removed?`);
    continue;
  }
  if (probe.status >= 500) {
    fail(`${path} — route answered ${probe.status}`);
    continue;
  }

  console.log(
    `  ok    ${path} (preflight ${response.status}, probe ${probe.status})`,
  );
}

if (failed) {
  console.error(
    '\nThe account-deletion page cannot reach the API from this origin. ' +
      'Play verifies this flow; treat it as a release blocker.',
  );
  process.exit(1);
}

console.log('Account-deletion endpoints are reachable and CORS-allowed.');
