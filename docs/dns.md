# DNS records this site expects

The apex `troskomir.stryna.com` is served by GitHub Pages via `public/CNAME`
and resolves correctly today.

## Outstanding: `www` does not resolve

A typed `www.troskomir.stryna.com` fails to load. GitHub Pages will redirect
`www` to the apex once the record exists, but the record itself has to be
created at whoever hosts DNS for `stryna.com` — it cannot be set from this
repository.

Add, at the DNS provider:

```
www.troskomir.stryna.com.   CNAME   nikdale.github.io.
```

Then confirm:

```
dig +short www.troskomir.stryna.com
curl -sI https://www.troskomir.stryna.com/ | head -1   # expect a 301
```

Accepting the failure is also a legitimate answer — nothing links to `www`,
and the store listings use the apex. It is written down here so it stays a
decision rather than an oversight.
