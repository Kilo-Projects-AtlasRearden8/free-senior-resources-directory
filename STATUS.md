# STATUS — Free Resources Directory for Seniors

## What was built

A freebies directory of free resources for seniors, delivered as Markdown + a static HTML site with client-side search. Resources are grouped into five categories: benefits, tech classes, legal aid, health info, and discounts. Every entry includes cost, who it's for, how to access, tags, and an official link only (no affiliate links).

Files:
- `index.html` — static site, client-side search and category filters, opens in any browser
- `data/resources.json` — structured directory data (24 resources, 5 categories)
- `resources.md` — plain Markdown version for offline reading
- `css/style.css` — site styles
- `js/app.js` — client-side search and category filters
- `scripts/verify.js` — validation checks (`npm test`)
- `package.json` — `npm test` / `npm start`
- `LICENSE` — MIT, Copyright (c) 2026 Asdale Dynamics, LLC
- `README.md` — project docs, credits Asdale Dynamics, LLC
- `.gitignore`
- `STATUS.md` — this file

## How to run

Open `index.html` in a web browser. No install, no build step; everything runs client-side.

Optional: serve locally

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

Or:

```sh
npm start
```

## Verification results

`npm test` passes:

```
ok: data/resources.json is valid JSON
ok: all 24 resources have required fields, valid non-affiliate links
ok: all category group toolIds reference existing resources (5 category groups)
ok: every resource is assigned to at least one category group
ok: index.html references CSS and JS; js/app.js loads the data file
ok: resources.md mentions every resource (24 resources)

Verification passed: 24 resources, 5 category groups
```

Smoke-tested in headless Chrome: `index.html`, `css/style.css`, `js/app.js`, and `data/resources.json` all return HTTP 200.

## Known gaps

- Links were validated for format and absence of affiliate markers, not for live reachability (no network dependency in tests).
- Discount entries note where membership or a fee applies (e.g., AARP membership, NPS Senior Pass fee) so seniors aren't surprised.
- `retail-senior-discounts` points to usa.gov as a general starter since store-specific senior policies vary by location; users should confirm with individual stores.
- Health information is educational only, not medical advice.

## Credits

Published by Asdale Dynamics, LLC (Indiana, formed Oct 2026). Beginner-friendly AI education, books, and practical tools. Hub site: https://dylanasdale.github.io
