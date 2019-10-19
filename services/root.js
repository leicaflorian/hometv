'use strict'
const axios = require('axios');

module.exports = function(fastify, opts, next) {
  fastify.get("/", function(request, reply) {
    reply.send("Benvenuto!")
  })


  fastify.get('/tv8', function(request, reply) {
    axios.get("https://video.sky.it/be/getLivestream?id=7")
      .then(resp => {
        console.log("redirecting to ", resp.data.streaming_url);

        reply.redirect(resp.data.streaming_url)
      })
  })

  fastify.get('/cielo', function(request, reply) {
    axios.get("https://video.sky.it/be/getLivestream?id=2")
      .then(resp => {
        console.log("redirecting to ", resp.data.streaming_url);

        reply.redirect(resp.data.streaming_url)
      })
  })

  fastify.get('/tg24', function(request, reply) {
    axios.get("https://video.sky.it/be/getLivestream?id=1")
      .then(resp => {
        console.log("redirecting to ", resp.data.streaming_url);

        reply.redirect(resp.data.streaming_url)
      })
  })

  next()
}