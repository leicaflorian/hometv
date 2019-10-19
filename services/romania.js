const axios = require('axios').default;
const mainURL = `https://video.sky.it/be/getLivestream?id=`;
const channelsMap = {
  protv: "https://vid.hls.protv.ro/protvhdn/protvhd.m3u8?1",
  protv2: "https://vid.hls.protv.ro/pro2n/pro2.m3u8?1",
  prox: "https://vid.hls.protv.ro/proxhdn/proxhd.m3u8?1",
  progold: "https://vid.hls.protv.ro/progoldn/progold.m3u8?1",
  procinema: "https://vid.hls.protv.ro/procineman/procinema.m3u8?1",
}

module.exports = function(fastify, opts, next) {

  fastify.get('/romania/:channel', function(request, reply) {
    reply.redirect(channelsMap[request.params.channel])
  })

  next()
}