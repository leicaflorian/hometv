const axios = require('axios').default;
//const { parse } = require("node-html-parser");
//const mainURL = `https://antenaplay.ro/live/`;
const channelsMap = {
  1: "https://ivm.antenaplay.ro/live/a1/playlist.m3u8?starttime=1572634362&endtime=1572641592&source=web&token=19Gjo_649kjwAQpbPNdvIFTiksQ=",
  stars: "https://ivm.antenaplay.ro/live/astars/playlist.m3u8?starttime=1572644226&endtime=1572651456&source=web&token=N4HEQd2CDyllH2Pz-A2JMGImUVs=",
  3: "https://ivm.antenaplay.ro/live/a3/playlist.m3u8?starttime=1572644404&endtime=1572651634&source=web&token=9gZLgGsKo2tD9ZfcFXYTP0SzPWw=",
  happy: "https://ivm.antenaplay.ro/live/happy/playlist.m3u8?starttime=1572644438&endtime=1572651668&source=web&token=D7IOda6ASbslf3KyrCXU8oyS3YE=",
  zu: "https://ivm.antenaplay.ro/live/zu/playlist.m3u8?starttime=1572644458&endtime=1572651688&source=web&token=uBAXmDWpNTWR3xaT6A0b2T3MLjo=",
  monden: "https://stream1.antenaplay.ro/live/smil:AntenaMonden.smil/playlist.m3u8?starttime=1572644484&endtime=1572651714&source=web&token=eIVitMeuiJ1tCwXpe2i4agfBapo=",
  comedy: "https://stream1.antenaplay.ro/live/smil:ComedyPlay.smil/playlist.m3u8?starttime=1572644519&endtime=1572651749&source=web&token=01HeoTUFbLYR2Y6a29M0zXr9QDM=",
  cook: "https://stream1.antenaplay.ro/live/smil:CookPlay.smil/playlist.m3u8?starttime=1572644563&endtime=1572651793&source=web&token=CtsQ0-1tUbKrsrSBXUrj8Rkp5E0=",
  international: "https://ivm.antenaplay.ro/live/ai/playlist.m3u8?starttime=1572644584&endtime=1572651814&source=web&token=YtJaymWLAZ5PtNP5a7Dys4SrAxE="
}

module.exports = function(fastify, opts, next) {

  fastify.get('/antena/:channel', function(request, reply) {

    reply.redirect(channelsMap[request.params.channel])
  })


  next()
}