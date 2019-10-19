const axios = require('axios').default;
const mainURL = `http://viacomitalytest-lh.akamaihd.net/i/sbshdlive_1@`;
const channelsMap = {
  spike: "829515",
  paramount: "195657",
}

module.exports = function(fastify, opts, next) {

  fastify.get('/paramount/:channel', function(request, reply) {
    reply.redirect(mainURL + channelsMap[request.params.channel] + "/master.m3u8")
  })

  next()
}