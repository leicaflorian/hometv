const axios = require('axios').default;
const mainURL = `https://video.sky.it/be/getLivestream?id=`;
const channelsMap = {
	tv8: "7",
	cielo: "2",
	tg24: "1",
}

module.exports = function(fastify, opts, next) {

  fastify.get('/sky/:channel', function(request, reply) {
    axios.get(mainURL + channelsMap[request.params.channel])
      .then(resp => {
        reply.redirect(resp.data.streaming_url)
      })
  })


  next()
}