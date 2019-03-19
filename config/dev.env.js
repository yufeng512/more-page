'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://172.21.11.23/api/member/"'
  // BASE_API: '"http://wmtuat.eloccitane.com/api/member/"',
  BASE_API: '"https://crm.eloccitane.com/api/member/"'
  // BASE_API: '"http://52.83.125.65/api/member/"',
})
