'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://106.75.229.98:7300/mock/5ff2dbbdd6786578b5c2718d/vue-admin"',
})
