import update, { LISTINGS_JSON_URL, setConfig, State } from "./update.js"
import notifier from "node-notifier"

//any allow/banlist can be disabled by setting it to undefined
let CONFIG // = {
//   locationsBanlist: ["Canada", "London, UK"], //filters if substring match i.e. "Canada" will filter "Toronto, Canada"
//   titleBanlist: ["Data Scien", "Data Analys", "Marketing", "Accounting", "Product"], //same behavior as locationsBanlist
//   companyBanlist: undefined, //filters if exact match (unlike locationsBanlist and titleBanlist)
//   termsAllowlist: ["Fall 2024", "Summer 2024"], //allows both "Fall 2024" and "Summer 2024"
// }
setConfig(CONFIG)

notifier.notify({
  title: "simplifyjobs-github-alerts",
  message: "Starting",
})

let state: State | undefined = undefined

while (true) {
  let res: Response
  try {
    res = await fetch(LISTINGS_JSON_URL, { cache: "no-store" })
  } catch (e) {
    process.stdout.write("!")
    await new Promise(resolve => setTimeout(resolve, 1000))
    continue
  }

  try {
    let [newState, newJobs] = await update(state, res)
    state = newState

    if (newJobs.length > 0) {
      console.log()
      console.log(`${newJobs.length} new listings:`)
      console.log(newJobs)

      notifier.notify({
        title: "simplifyjobs-github-alerts",
        message: `${newJobs.length} new jobs`,
      })
    } else {
      process.stdout.write(".")
    }
  } catch (e) {
    console.error(e)
  }

  await new Promise(resolve => setTimeout(resolve, 60_000))
}
