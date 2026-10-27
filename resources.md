# Free Resources Directory for Seniors

Free benefits, tech classes, legal aid, health information, and discounts for seniors — grouped by category, official links only. No affiliate links.

Published by **Asdale Dynamics, LLC** (Indiana, formed Oct 2026) — beginner-friendly AI education, books, and practical tools. Part of the [dylanasdale.github.io](https://dylanasdale.github.io) hub.

## What's inside

| File | Purpose |
|------|---------|
| `index.html` | Static site with client-side search and category filters. Opens in any browser — no install, no build step. |
| `data/resources.json` | Structured directory data: resources across benefits, tech classes, legal aid, health info, and discounts, each with cost, who it's for, how to access, official link, and tags. |
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

## Adding or editing a resource

1. Add an entry to the `resources` array in `data/resources.json` (fields: `id`, `name`, `category`, `cost`, `costDetail`, `description`, `whoItHelps`, `howToAccess`, `link`, `tags`).
2. Add the `id` to the matching group in `groups.byCategory`.
3. Add the resource to `resources.md` under the matching category section.
4. Run `npm test`.

## Categories

### Benefits & assistance

- **Social Security — Retirement & SSI Benefits** — Retirement, disability, and Supplemental Security Income (SSI). Create a free my Social Security account at ssa.gov. [ssa.gov](https://www.ssa.gov/)
- **Medicare** — Federal health insurance for people 65+. Learn about Part A, Part B, Part D, and enrollment at medicare.gov. [medicare.gov](https://www.medicare.gov/)
- **Medicaid** — Free or low-cost health coverage based on income. Apply through your state Medicaid agency. [medicaid.gov](https://www.medicaid.gov/)
- **Benefits.gov — Benefit Finder** — Official questionnaire matching you to federal and state benefit programs. [benefits.gov](https://www.benefits.gov/)
- **Eldercare Locator (Area Agency on Aging)** — Local services: transportation, meals, caregiving, benefits counseling. Call 1-800-677-1116. [eldercare.acl.gov](https://eldercare.acl.gov/)
- **SNAP (Food Assistance)** — Monthly grocery benefits on an EBT card. Apply through your state SNAP office. [fns.usda.gov/snap](https://www.fns.usda.gov/snap)
- **LIHEAP (Energy Bill Assistance)** — Help paying heating and cooling bills. Apply through your state LIHEAP office. [benefits.gov/liheap](https://www.benefits.gov/liheap)
- **VA Benefits for Veterans** — Health care, disability compensation, pension, and burial benefits. [va.gov](https://www.va.gov/)

### Tech classes

- **Senior Planet (AARP) — Free Tech Classes** — Free technology classes and coaching for older adults. [seniorplanet.org](https://seniorplanet.org/)
- **GCFGlobal — Free Tech Tutorials** — Free plain-language tutorials on computers, email, internet, and smartphones. [edu.gcfglobal.org](https://edu.gcfglobal.org/)
- **DigitalLearn (Public Library Association)** — Short beginner courses on computer basics and internet safety. [digitallearn.org](https://www.digitallearn.org/)
- **AARP TEK Workshops & Virtual Community Center** — Free tech workshops and online events for seniors. [aarp.org](https://www.aarp.org/)

### Legal aid

- **Legal Services Corporation — Find Legal Aid** — Federally funded civil legal aid; find a local office. [lsc.gov](https://www.lsc.gov/)
- **LawHelp.org — Free Legal Help Directory** — State-by-state directory of free legal aid and self-help guides. [lawhelp.org](https://www.lawhelp.org/)
- **Pro Bono Net** — Volunteer lawyers and free legal resources. [probono.net](https://www.probono.net/)
- **National Elder Law Foundation** — Directory of certified elder law attorneys. [nelf.org](https://www.nelf.org/)

### Health info

- **MedlinePlus (NIH)** — Trustworthy, ad-free health information on conditions, drugs, and wellness. [medlineplus.gov](https://medlineplus.gov/)
- **National Institute on Aging (NIH)** — Free info on aging, Alzheimer's, caregiving, and healthy living. [nia.nih.gov](https://www.nia.nih.gov/)
- **CDC — Healthy Aging & Preventive Health** — Vaccines, screenings, and fall-prevention guidance. [cdc.gov](https://www.cdc.gov/)
- **HealthCare.gov — Marketplace & Medicaid** — Compare health plans and check Medicaid/CHIP eligibility. [healthcare.gov](https://www.healthcare.gov/)

### Discounts & savings

- **AARP Member Discounts & Advantages** — Member-only discounts on travel, dining, shopping, health, and entertainment (AARP membership required). [aarp.org/advantages](https://www.aarp.org/advantages/)
- **National Park Service Senior Pass** — Entry to national parks and federal recreation sites for U.S. residents 62+. [nps.gov/planyourvisit/passes.htm](https://www.nps.gov/planyourvisit/passes.htm)
- **Amtrak Senior Discount** — 10% off most fares for travelers 65+. [amtrak.com](https://www.amtrak.com/)
- **Retail Senior Discounts (Official Store Policies)** — Senior discount days and savings at grocery, pharmacy, and retail chains; check each store's official policy. [usa.gov](https://www.usa.gov/)

## Style

Plain English, step by step, never condescending — written for beginners, tested, local-first, no secrets or personal data, no affiliate links.

## Credits

Published by Asdale Dynamics, LLC (Indiana, formed Oct 2026). LLC focus: beginner-friendly AI education, books and guides, and practical tools. Hub site: [dylanasdale.github.io](https://dylanasdale.github.io).

## License

MIT License. Copyright (c) 2026 Asdale Dynamics, LLC. See [LICENSE](LICENSE).
