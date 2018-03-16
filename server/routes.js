// just in case custom routing comes into play

const routes = [
  {
    title: 'Home',
    route: '/'
  },
  {
    title: 'Car Washes',
    route: '/washes',
    children: [
      {
        title: 'Exterior Washes',
        route: '/washes/exterior',
        children: [
          {
            title: 'Wash Packs',
            route: '/washes/exterior-wash-packs'
          },
          {
            title: 'Fast Pass',
            route: '/washes/exterior-fast-pass'
          }
        ]
      },
      {
        title: 'Full Service',
        route: '/washes/full-service',
        children: [
          {
            title: 'Fast Pass',
            route: '/washes/full-service-fast-pass'
          }
        ]
      },
      {
        title: 'Express Detail',
        route: '/washes/express-detail'
      },
      {
        title: 'Gift Cards',
        route: '/washes/gift-cards'
      },
      {
        title: 'Fleet Accounts',
        route: '/washes/fleet-accounts'
      },
      {
        title: 'Specials',
        route: '/washes/specials'
      }
    ]
  },
  {
    title: 'Fast Pass - Unlimited',
    route: '/fastpass',
    children: [
      {
        title: 'Compare Plans',
        route: '/fastpass/compare'
      },
      {
        title: 'Manage your account',
        route: '/fastpass/manage'
      }
    ]
  },
  {
    title: 'About',
    route: '/about',
    children: [
      {
        title: 'Company',
        route: '/about/company'
      },
      {
        title: 'Testimonials',
        route: '/about/testimonials'
      },
      {
        title: 'News',
        route: '/about/news'
      },
      {
        title: 'Careers',
        route: '/about/careers'
      },
      {
        title: 'FAQ',
        route: '/about/FAQ'
      },
      {
        title: 'Contact',
        route: '/about/contact'
      }
    ]
  },
  {
    title: 'Locations',
    route: '/locations'
  },
  {
    title: 'My Account',
    route: '/my-account',
    children: [
      {
        title: 'Fast Pass',
        route: '/my-account/fast-pass'
      },
      {
        title: 'Gift Cards',
        route: '/my-account/gift-cards'
      }
    ]
  }
]

module.exports = routes
