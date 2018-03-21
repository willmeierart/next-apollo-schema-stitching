## active
[] find out about which menu items have dropdowns
[] research SEO of franchises
  [] work out EXACTLY what routing schema 

[] restrict google maps key

[] finish udemy graphql course

## meeting 03/15/18
- all sites together
  
  - you get all location data from every graphcms endpoint, route to new site if they choose a location that's not in the brand they're on right now
  - show a logo with a link to the other brand for every brand in the footer
  - could even show a map with brand territory
  - multiple stylistic states based on
    - domain originally routed to
    - map location selected
  - in graphcms need domain site belongs to as a content type

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