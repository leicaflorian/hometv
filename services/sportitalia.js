const axios = require('axios').default;

module.exports = function(fastify, opts, next) {

  fastify.get('/sportitalia', function(request, reply) {

    axios.get("https://www.sportitalia.com/api/v2/content/57561/access")
      .then(resp => {
        reply.redirect(resp.data.stream)
      })
  })

  next();

}