```bash
npm i
```

```bash
npm run start
```

by default, it will alert on all new postings.

this can be configured in config in src/index.ts

```js
const CONFIG = {
  locationsBanlist: ["Canada", "London, UK"], //filters if substring match i.e. "Canada" will filter "Toronto, Canada"
  titleBanlist: ["Data Scien", "Data Analys", "Marketing", "Accounting", "Product"], //same behavior as locationsBanlist
  companyBanlist: undefined, //filters if exact match (unlike locationsBanlist and titleBanlist)
  termsAllowlist: ["Fall 2024", "Summer 2024"], //allows both "Fall 2024" and "Summer 2024"
}
```