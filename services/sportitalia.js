const axios = require('axios').default;

module.exports = function(fastify, opts, next) {

  fastify.get('/sportitalia', async function(request, reply) {
    const resp = await axios.post("https://www.sportitalia.com/api/v2/content/57561/access")
    const streamUrl = resp.data.data.stream

    reply.redirect(streamUrl)
  })

  next();

}