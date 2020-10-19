'use strict'

const fp = require('fastify-plugin');
const resolve = require('path').resolve

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

async function plugin(fastify, opts, next) {
  fastify.decorate('someSupport', function() {
    return 'hugs'
  })

  fastify.register(require('fastify-cookie'));

  fastify.register(require('point-of-view'), {
    engine: {
      pug: require('pug'),
    },
    includeViewExtension: true,
    templates: 'views',
    options: {
      layout: './views/template.pug',
      filename: resolve('views')
    }
  })

  next()
}


module.exports = fp(plugin, {
  fastify: '3.x',
})
// If you prefer async/await, use the following
//
// module.exports = fp(async function (fastify, opts) {
//   fastify.decorate('someSupport', function () {
//     return 'hugs'
//   })
// })