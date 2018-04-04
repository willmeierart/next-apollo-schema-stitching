const path = require('path')
const glob = require('glob')

module.exports = {
  webpack: (config, { dev }) => {
    config.module.rules.push(
      { test: /\.graphql?$/, loader: 'webpack-graphql-loader' }
    )
    return config
  }
}
