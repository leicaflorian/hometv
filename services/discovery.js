const axios = require('axios').default;
const mainURL = `https://it.dplay.com/ajax/playbackjson/channel/`;
const channelsMap = {
  nove: "3",
  realtime: "2",
  dmax: "5",
  giallo: "6",
  k2: "7",
  frisbee: "8",
  food: "21"
}

module.exports = function(fastify, opts, next) {

  fastify.get('/discovery/:channel', function(request, reply) {
    console.log(mainURL + channelsMap[request.params.channel]);

    axios.get(mainURL + channelsMap[request.params.channel], {
        withCredentials: true,
        headers: {
          Referer: "https://it.dplay.com/nove/",
          "X-Requested-With": "XMLHttpRequest",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36",
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-Mode": "cors"
        }

      })
      .then(resp => {
        const jsonData = JSON.parse(resp.data);

        reply.redirect(jsonData.data.attributes.streaming.hls.url)
      })
      .catch(er => {
        console.log(er.message);

        reply.send(er);
      })
  })


  next()
}