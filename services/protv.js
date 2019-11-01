const mainURL = `https://vid.hls.protv.ro/`;
const channelsMap = {
  protv: "protvhd.m3u8?1",
  protv2: "pro2n/pro2.m3u8?1",
  prox: "proxhdn/proxhd.m3u8?1",
  progold: "progoldn/progold.m3u8?1",
  procinema: "procineman/procinema.m3u8?1",
}

module.exports = function(fastify, opts, next) {

  fastify.get('/protv/:channel', function(request, reply) {
    reply.redirect(mainURL + channelsMap[request.params.channel]);
  })

  next()
}