import { internalUpdate, setConfig } from "./update.js"
import notifier from "node-notifier"

setConfig({
  locationsBanlist: ["Canada"],
  titleBanlist: ["Data Scien", "Data Analys", "Marketing", "Frontend", "Accounting", "Product"],
  companyBanlist: undefined,
  termsAllowlist: ["Fall 2024", "Winter 2024"],
})

let listingsTextPrefix = `[
    {
        "company_name": "Capital One",
        "locations": [
            "McLean, VA",
            "Plano, TX"
        ],
        "title": "Product Development Intern ",
        "terms": [
            "Summer 2024"
        ],
        "id": "98b2d671-3f03-430e-b18c-e5ddb8ce5035"
    }`

let state = undefined

state = (await internalUpdate(state, `${listingsTextPrefix}]`))[0]

let listingsText =
  listingsTextPrefix +
  `,
    {
        "company_name": "Akuna Capital",
        "id": "0b82dc72-56a8-4fc9-aae5-c008f6da0b02",
        "title": "Trading Internship",
        "terms": [
            "Fall 2024", "Summer 2024"
        ],
        "locations": [
            "Chicago, IL"
        ]
    },
        {
        "company_name": "Akuna Capital",
        "id": "e11db57c-bdea-4be0-bc67-9001293524d6",
        "title": "Performance Engineer Intern",
        "terms": [
            "Summer 2024"
        ],
        "locations": [
            "Chicago, IL"
        ]
    },
    {
        "company_name": "Akuna Capital",
        "id": "6f863309-148d-494d-aa36-f375a1af4bef",
        "title": "Quantitative Strategist Intern",
        "terms": [
            "Fall 2024"
        ],
        "locations": [
            "Chicago, IL",
            "ASDFASDF, Canada"
        ]
    },
    {
        "company_name": "Akuna Capital",
        "id": "6f863309-148d-494d-aa36-f375a1af4bed",
        "title": "Data ScienQuantitative Strategist Intern",
        "terms": [
            "Fall 2024"
        ],
        "locations": [
            "Chicago, IL"
        ]
    }
  ]`

let [, newListings] = await internalUpdate(state, listingsText)

if (newListings.length > 0) {
  notifier.notify({
    title: "simplifyjobs-github-alerts",
    message: `${newListings.length} new job listings`,
  })
}

console.log(`${newListings.length} new job listings:`)
console.log(newListings)
