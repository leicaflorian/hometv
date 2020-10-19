/* const axios = require('axios').default;
var httpProxy = require('http-proxy'); */
const mainURL = `https://mn-nl.mncdn.com/`;
const channelsMap = {
  tvr1: "tvr_1_live/tvr_1_live2",
  tvr2: "tvr_2_live/tvr_2_live2",
  tvr3: "tvr_3_live/tvr_3_live2",
  tvrhd: "tvr_hd_live/tvr_hd_live2",
  tvri: "tvr_i_live/tvr_i_live2",
  tvrmoldova: "tvr_moldova_live/tvr_moldova_live2",
  tvrcraiova: "tvr_craiova_live/tvr_craiova_live2",
  tvrcluj: "tvr_cluj_live/tvr_cluj_live2",
  tvriasi: "tvr_iasi_live/tvr_iasi_live2",
  tvrtimisoara: "tvr_timisoara_live/tvr_timisoara_live2",
  tvrtirgumures: "tvr_tirgumures_live/tvr_tirgumures_live2",
}

module.exports = function(fastify, opts, next) {

  fastify.get('/tvr/:channel', function(request, reply) {
    reply.redirect(mainURL + channelsMap[request.params.channel] + "/playlist.m3u8")
  })


  /* fastify.get('/tvr', function(request, reply) {
    var proxy = httpProxy.createProxyServer({
      target: 'ro35.nordvpn.com',
      changeOrigin: true
    });


    proxy.web(request, reply, { forward: channelsMap.tvr1 }, function(e) {
      reply.send(e)
    });

    //http://localhost:4000/tvr
  }) */



  next()
}