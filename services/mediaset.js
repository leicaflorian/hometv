const axios = require('axios').default;
const mainURL = `https://static3.mediasetplay.mediaset.it/apigw/nownext/`;

const channelsMap = {
  r4: "R4",
  c5: "C5",
  i1: "I1",
  i2: "I2",
  20: "LB",
  la5: "KA",
  iris: "KI",
  focus: "FU",
  extra: "KQ",
  topc: "LT",
  boing: "KB",
  cartoon: "LA",
  tg24: "KF",
  r101: "ER",
  virgin: "EW",
  m4c: "W1",
}

function getHLSUrl(resp) {
  const urlList = resp.data.response.tuningInstruction["urn:theplatform:tv:location:any"];

  return urlList.filter(urlObject => urlObject.format === "application/x-mpegURL")[0].publicUrls[0]
}


module.exports = function(fastify, opts, next) {

  fastify.get('/mediaset/:channel', function(request, reply) {
    const canale = channelsMap[request.params.channel];

    axios.get(`${mainURL}${canale}.json`)
      .then(resp => {
        reply.redirect(getHLSUrl(resp))
      })
  })

  next();

}