## active
[] general
  [x] find out about which menu items have dropdowns - ALL
  [] FINISH UDEMY GRAPHQL
  [] implement proptypes
  [] clean up && comment code

[] locations 
  [x] work out routing completely
    [] make sure query strings parseable - DOESN'T NEED TO SSR
    [] make sure everything actually being SSR'd
  [] maps
    [] restrict api key
    [] get working on serverside - DOES IT NEED TO?
    [] deal with automatic bounds / markers / etc
    [] get working with indirect search (markers)
    [] check out potential for styling (esp america border)
  [] figure out multi-endpoint apollo thing (schema-stitching?)
  [] figure out how to bind 'region' (or derive it from data) to each location
  [] start working on binding functions to real data, graphcms
  

## nuances of locations section
- initial view
  - locations initial state = all locations from the brand of the site you're on
  - map is not interactive, just shows each location of every site, the brand logo is the marker
    - might even just be an image mocked up by design
- on search
  - there is a specific range (*5mi?*) that is considered 'close'
  - when someone searches for a location, all carwashes that are 'close' show up
    - location search hits **all** graphcms endpoints for all brands (not just brand of current site)
      - there is a query for just location ids and lat/lng
        - find a way to convert lat/lng to miles, use Math.abs()
      - get those results, display **all** 'close' locations, indicate (*via logo?*) if they are from a different brand
  - if none are 'close', just show closest (*how many? from any brand or just nearest from this brand??*)
  - *what happens if someone searches 'denver', do you search in any direction  of city bounds? from city center?*
    - *maybe use 'location type' that comes back from search to define range? (type:city = 30mi from center?)*
- after search
  - hold all those results in state (even if not from this brand)
    - find a way to display information simultaneously on different pages of the sites
  - clear state on new search
- *is the map interactive on any of these pages? if so, how?*
- so a list of **locations** queries:
  - ALL backend endpoints 


## locations routing / SEO / etc...
- notes
  - does results page have to be dynamic? i.e. results/denver
    - or can it just be querystring of search (because search could be anything)
      - if you have a querystring, you could still have dynamic /:routes also, right? (structurally)
      - is the query string reverse-parseable
    - or is it just always results and holds state based on your previous search
      - will redirect to init if you've never visited
  - how many levels deep does url need to go

- approaches
  - a
    - locations >> (init)
    - locations/search?=whatever-search-was
    - locations?
    - locations/results/:id
      - id === [state] >> return state results
      - id === [name]  >> return specific page


I’ve got a ‘locations’ page which has 3 states:
- ‘initial’ (just a search bar)
- 'results' (co-interactive search bar & map with a list of results)
- 'detail' (once you've picked a location)
& I need to be able to navigate (synthetically), primarily for SEO purposes, to pages like:
1. a specific search (i.e. '80210')
2. predefined 'zones' (i.e. 'Colorado' or 'Denver')
3. any specific location's detail page
So, I'm thinking I need to have a routing structure like:
- initial: ```/locations```
- results:
  - ```/locations/results?search=some+stringified+specific+search```
- region:
  - ```/locations/region/:some/:level/:of/:specificity```
- detail:
  - ```/locations/detail/franchiseBrand/some-specific-location's-identifier```
& I'm wondering, does this cover the bases / have potential conflicts? I'm thinking that I've solved the problem of having multiple ways of treating the  ```/locations/results``` route by using the query string instead of a subroute... but just wanna make sure the strategy I'm gonna go for is actually a good idea


## logic for location state etc

if (isServer) {
  setPageState(url.query.state)
  if (initial) {
    doGeo()
  } else if ()
} else {

}