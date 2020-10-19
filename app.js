'use strict'

const path = require('path')
const Fastify = require('fastify')
const AutoLoad = require('fastify-autoload')
const channels = require('./config/channels')

require('dotenv').config()

const port = process.env.PORT || '4000'
const env = process.env.NODE_ENV || 'development'

const opts = {
  logger: true
}

const fastify = Fastify(opts)

for (const group of channels.groups) {
  try {
    const channelClass = require(`./classes/${group.groupTitle}Channels`)

    fastify.get(`/${group.groupTitle.toLowerCase()}/:channel`,
      new channelClass(group))
  } catch (er) {
    console.error(er)
  }
}

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

fastify.listen(port, '0.0.0.0')