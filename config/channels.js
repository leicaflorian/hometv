module.exports = {
  tvg: {
    logosUrl: 'https://api.superguidatv.it/v1/channels/${id}/logo?width=120&theme=dark'
  },
  groups: [
    {
      baseUrl: 'https://static3.mediasetplay.mediaset.it/apigw/nownext/${code}.json',
      groupTitle: 'Mediaset',
      channels: require('./channels/mediaset')
    }, {
      baseUrl: 'https://mediapolis.rai.it/relinker/relinkerServlet.htm?cont=${code}',
      groupTitle: 'Rai',
      channels: require('./channels/rai')
    }, {
      baseUrl: 'https://apid.sky.it/vdp/v1/getLivestream?id=${code}&isMobile=false',
      groupTitle: 'Sky',
      channels: require('./channels/sky')
    }, {
      baseUrl: 'http://viacomitalytest-lh.akamaihd.net/i/sbshdlive_1@${code}/master.m3u8',
      groupTitle: 'Paramount',
      channels: require('./channels/paramount')
    },{
      baseUrl: 'https://it.dplay.com/ajax/playbackjson/channel/${code}',
      groupTitle: 'Discovery',
      channels: require('./channels/discovery')
    },{
      baseUrl: 'https://www.sportitalia.com/api/v2/content/57561/access',
      groupTitle: 'SportItalia',
      channels: require('./channels/other').sportItalia
    },{
      baseUrl: 'https://vid.hls.protv.ro/${code}',
      groupTitle: 'ProTV',
      channels: require('./channels/proTv')
    }
  ]
}