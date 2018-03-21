const UrlPrettifier = require('next-url-prettifier').default
const qs = require('qs')

const routes = [
  {
    page: 'index',
    title: 'Home',
    prettyUrl: '/'
  },
  {
    page: 'washes',
    title: 'Car Washes',
    prettyUrl: ({ title }) => {
      // console.log(title)
      const root = title === 'Car Washes'
      return root
        ? '/washes'
        : `/washes/${title.toLowerCase().replace(' ', '-')}`
    },
    prettyUrlPatterns: [
      { pattern: '/washes/:title', defaultParams: {} }
    ],
    children: [
      { title: 'Exterior Washes' },
      { title: 'Full Service' },
      { title: 'Express Detail' },
      { title: 'Fleet Accounts' },
      { title: 'Specials' }
    ]
  },
  {
    page: 'fastpass',
    title: 'Fast Pass - Unlimited',
    prettyUrl: '/fastpass'
  },
  {
    page: 'about',
    title: 'About',
    prettyUrl: ({ title }) => {
      const root = title === 'About'
      return root
        ? '/about/company'
        : `/about/${title.toLowerCase()}`
    },
    prettyUrlPatterns: [
      { pattern: '/about/:title', defaultParams: {} }
    ],
    children: [
      { title: 'Company' },
      { title: 'Testimonials' },
      { title: 'News' },
      { title: 'Careers' },
      { title: 'FAQ' },
      { title: 'Contact' }
    ]
  },
  {
    page: 'locations',
    title: 'Locations',
    prettyUrl: ({ state = '', query = '' }) => {
      switch (state) {
        default:
          return '/locations'
      }
    }
  },
  {
    page: null,
    title: 'My Account',
    prettyUrl: '/my-account'
  },
  {
    page: 'legal',
    title: 'Legal',
    prettyUrl: '/legal'
  }
]

const urlPrettifier = new UrlPrettifier(routes)
// const urlPrettifier = new UrlPrettifier(routes, {
//   paramsToQueryString: (params) => params.query ? `?${qs.stringify(params.query)}` : ''
// })

exports.routes = routes
exports.Router = urlPrettifier
