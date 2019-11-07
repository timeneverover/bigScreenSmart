'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SERVER_URL: '"http://192.168.34.115:8080/checkUser/"', //http://192.168.34.147:8080/ultra-work/
  REPORT_URL: '"http://192.168.180.92:58089/"',
})
