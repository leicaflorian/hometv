const axios = require('axios').default;
const mainURL = `https://it.dplay.com/ajax/playbackjson/channel/`;
const channelsMap = {
	nove: "3",
	realtime: "2",
	dmax: "5",
	giallo: "6",
	k2: "7",
	frisbee: "8",
}

module.exports = function(fastify, opts, next) {

  fastify.get('/discovery/:channel', function(request, reply) {
		console.log(mainURL + channelsMap[request.params.channel]);
		
    axios.get(mainURL + channelsMap[request.params.channel])
      .then(resp => {
				const jsonData = JSON.parse(resp.data);

        reply.redirect(jsonData.data.attributes.streaming.hls.url)
			})
			.catch(er => {
				console.log(er.message);
				
			})
  })


  next()
}