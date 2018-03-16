const express = require('express')
const next = require('next')
const routes = require('./routes')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const port = process.env.PORT || 3000
  // const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
    server.use('/static', express.static('static'))

    // server.get('/thing/:id', (req, res) => {
    //     return app.render(req, res, '/thing', { id: req.params.id })
    // })

    server.get('*', (req, res) => {
      // return handle(req, res)
      return app.render(req, res, '/', req.query)
    })

    // routes.forEach((route, i) => {
    //   console.log(route.route);
    //   server.get(route.route, (req, res) => {
    //     return app.render(req, res, route.route)
    //   })
    //   if (route.children) {
    //     if (route.children.length > 0) {
    //       route.children.forEach((child, j) => {
    //         server.get(`${route.route}/:slug`, (req, res) => {
    //           return app.render(req, res, route.route, {
    //             slug: req.params.slug
    //           })
    //         })
    //       })
    //     }
    //   }
    // })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
