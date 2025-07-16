alerts for https://github.com/SimplifyJobs/Summer2026-Internships

```bash
npm i
```

```bash
npm run start
```

by default, it will alert on all new postings.

this can be configured in src/index.ts

```js
let CONFIG = {
  locationsBanlist: ["Canada", "London, UK"], //filters if substring match i.e. "Canada" will filter "Toronto, Canada"
  titleBanlist: ["Data Scien", "Data Analys", "Marketing", "Accounting", "Product"], //same behavior as locationsBanlist
  companyBanlist: undefined, //filters if exact match (unlike locationsBanlist and titleBanlist)
  termsAllowlist: ["Fall 2025", "Summer 2026"], //allows both "Fall 2025" and "Summer 2026"
  
  // New filtering options available in 2026 format:
  // sponsorshipAllowlist: ["Offers Sponsorship"], //only show jobs that offer visa sponsorship
  // activeOnly: true, //only show active job postings
  // sourceAllowlist: ["Simplify"], //only show jobs from specific sources
}
```
