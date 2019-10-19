'use strict'

const path = require('path')
const Fastify = require('fastify')
const AutoLoad = require('fastify-autoload')

const port = process.env.PORT || '3000';
const env = process.env.NODE_ENV || 'development';

const opts = {
  logger: true
}

const fastify = Fastify(opts)


//module.exports = function (fastify, opts, next) {
// Place here your custom code!

// Do not touch the following lines

// This loads all plugins defined in plugins
// those should be support plugins that are reused
// through your application
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins'),
  options: Object.assign({}, opts)
})

// This loads all plugins defined in services
// define your routes in one of these
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'services'),
  options: Object.assign({}, opts)
})

// Make sure to call next when done
//  next()

//}

fastify.listen(port)