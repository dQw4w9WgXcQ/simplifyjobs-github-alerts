let config = undefined

export function setConfig(newConfig) {
  config = newConfig
}

export type State = {
  listingsText: string
  listings: Map<string, Listing>
}

type Listing = {
  company_name: string
  title: string
  locations: string[]
  terms: string[]
  id: string
}

export const LISTINGS_JSON_URL =
  "https://raw.githubusercontent.com/SimplifyJobs/Summer2024-Internships/dev/.github/scripts/listings.json"

export default async function update(state: State | undefined, res: Response): Promise<[State, Listing[]]> {
  if (!res.ok) throw new Error(`Failed to fetch listings: ${res.statusText}`)

  return internalUpdate(state, await res.text())
}

//exported for test
export async function internalUpdate(state: State | undefined, listingsText: string): Promise<[State, Listing[]]> {
  if (!state) {
    return [
      {
        listingsText,
        listings: toListingMap(listingsText),
      },
      [],
    ]
  }

  if (state.listingsText === listingsText) return [state, []]

  let listings = toListingMap(listingsText)

  let newListings = []
  for (let [id, listing] of listings) {
    if (!state.listings.has(id)) newListings.push(listing)
  }

  if (newListings.length > 0) {
    console.log(`${newListings.length} new listings before filtering`)

    if (config) {
      if (config.locationsBanlist) {
        newListings = newListings.filter(listing => {
          for (let location of listing.locations) {
            for (let bannedLocation of config.locationsBanlist) {
              if (location.includes(bannedLocation)) return false
            }
          }
          return true
        })
      }

      if (config.titleBanlist) {
        newListings = newListings.filter(listing => {
          for (let bannedTitle of config.titleBanlist) {
            if (listing.title.includes(bannedTitle)) return false
          }
          return true
        })
      }

      if (config.termsAllowlist) {
        newListings = newListings.filter(listing => {
          for (let term of listing.terms) {
            if (config.termsAllowlist.includes(term)) return true
          }
          return false
        })
      }

      if (config.companyBanlist) {
        newListings = newListings.filter(listing => !config.companyBanlist.includes(listing.company_name))
      }
    }
  }

  return [
    {
      listingsText,
      listings,
    },
    newListings,
  ]
}

function toListingMap(listingsText: string): Map<string, Listing> {
  let listings = JSON.parse(listingsText) as Listing[]
  return new Map<string, Listing>(listings.map(l => [l.id, l]))
}
