// pretty simple, but this is what controls the synthetic routing

const nextRoutes = require('next-routes')
const router = nextRoutes()

router.add('main', '/:slug', '')  // <<< transition example = this only
  // .add('home', '/:slug', '')
  // .add('contact', '/:slug', '')

export default router
