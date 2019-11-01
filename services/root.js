'use strict'
const axios = require('axios');

module.exports = function(fastify, opts, next) {
  fastify.get("/", function(request, reply) {
    const fs = require('fs')
    const stream = fs.createReadStream('assets/lista_iptv.m3u', 'utf8')

    reply.send(stream)
  })

  fastify.get('/iptest', function(request, reply) {
    var ip = require("ip");

    reply.send(ip.address())
  })

  next()
}