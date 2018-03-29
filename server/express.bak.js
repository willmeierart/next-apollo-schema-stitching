const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const port = process.env.PORT || 3000
const handle = app.getRequestHandler()

// raw express server, before using next-url-prettifier

app.prepare()
  .then(() => {
    const server = express()
    server.use('/static', express.static('static'))

    server.get('/washes', (req, res) => {
      return app.render(req, res, '/washes')
    })
    server.get('/washes/:id', (req, res) => {
      return app.render(req, res, '/washes', { id: req.params.id })
    })
    server.get('/fastpass', (req, res) => {
      return app.render(req, res, '/fastpass')
    })
    server.get('/about', (req, res) => {
      return app.render(req, res, '/about')
    })
    server.get('/about/:id', (req, res) => {
      return app.render(req, res, '/about', { id: req.params.slug })
    })
    server.get('/locations', (req, res) => {
      return app.render(req, res, '/locations')
    })
    server.get('/locations/search', (req, res) => {
      return app.render(req, res, '/locations')
    })
    server.get('/locations/search/:id', (req, res) => {
      return app.render(req, res, '/about', { id: req.params.id })
    })
    server.get('/legal', (req, res) => {
      return app.render(req, res, '/legal')
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
