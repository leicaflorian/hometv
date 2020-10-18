const axios = require('axios').default;
const {template: _template} = require("lodash")
//const mainURL = `https://video.sky.it/be/getLivestream?id=`;
const mainURL = "https://apid.sky.it/vdp/v1/getLivestream?id=${id}&isMobile=false";
const channelsMap = {
	tv8: "7",
	skyarte: "8",
	cielo: "2",
	tg24: "1",
}

module.exports = function (fastify, opts, next) {

	fastify.get('/sky/:channel', async function (request, reply) {
		const url = _template(mainURL)

		const resp = await axios.get(url({id: channelsMap[request.params.channel]}))

		reply.redirect(resp.data.streaming_url)
	})


	next()
}