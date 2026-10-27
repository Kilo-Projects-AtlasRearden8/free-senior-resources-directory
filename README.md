# Free Resources Directory for Seniors

A free directory of resources for seniors — benefits, tech classes, legal aid, health information, and discounts — grouped by category, each with cost, who it's for, how to access, and an official link. No affiliate links.

Published by **Asdale Dynamics, LLC** (Indiana, formed Oct 2026) — beginner-friendly AI education, books, and practical tools. Part of the [dylanasdale.github.io](https://dylanasdale.github.io) hub.

## What's inside

| File | Purpose |
|------|---------|
| `index.html` | Static site with client-side search and category filters. Opens in any browser — no install, no build step. |
| `data/resources.json` | Structured directory resources across benefits, tech classes, legal aid, health info, and discounts. |
| `resources.md` | Plain Markdown version of the directory for offline reading. |
| `css/style.css` | Site styles. |
| `js/app.js` | Client-side search and category filters. |
| `scripts/verify.js` | Validation checks run by `npm test`. |

## How to run

Open `index.html` in a web browser. That's it — the page loads `data/resources.json` and renders the directory client-side.

Optional: serve it locally

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

Or with npm:

```sh
npm start
```

## Verification

```sh
npm test
```

Checks `data/resources.json` is valid JSON, every resource has all required fields, every link is valid and non-affiliate, every category group references real resources, every resource is assigned to a category group, `index.html` references its assets, and `resources.md` mentions every resource.

## Style

Plain English, step by step, never condescending — written for beginners, tested, local-first, no secrets or personal data, no affiliate links.

## Credits

Published by Asdale Dynamics, LLC (Indiana, formed Oct 2026). LLC focus: beginner-friendly AI education, books and guides, and practical tools. Hub site: [dylanasdale.github.io](https://dylanasdale.github.io).

## License

MIT License. Copyright (c) 2026 Asdale Dynamics, LLC. See [LICENSE](LICENSE).
