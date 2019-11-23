const channelsMap = {
  //la7: "https://d15umi5iaezxgx.cloudfront.net/OUT/HLS/Live.m3u8",
  la7: "https://stream.la7.it/out/v1/fe849af8150c4c51889b15dadc717774/index.m3u8",
}

module.exports = function(fastify, opts, next) {

  fastify.get('/others/:channel', function(request, reply) {
    reply.redirect(channelsMap[request.params.channel])
  })

  next()
}