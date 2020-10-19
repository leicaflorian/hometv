module.exports = {
  tvg: {
    logosUrl: 'https://api.superguidatv.it/v1/channels/${id}/logo?width=120&theme=dark',
    order: [
      'rai.rai1',
      'rai.rai2',
      'rai.rai3',
      'mediaset.r4',
      'mediaset.c5',
      'mediaset.i1',
      'mediaset.20',
      'mediaset.focus',
      'mediaset.extra',
      'mediaset.i2',
      'mediaset.la5',
      'mediaset.iris',
      'mediaset.topc',
      'mediaset.c34',
      'mediaset.boing',
      'mediaset.cartoon',
      'mediaset.cartoon',
      'discovery.dmax',
      'discovery.nove',
      'discovery.realtime',
      'discovery.food',
      'discovery.giallo',
      'discovery.k2',
      'discovery.frisbee',
      'sky.tv8',
      'sky.cielo',
      'paramount.spike',
      'paramount.paramount',
      'rai.rai4',
      'rai.rai5',
      'rai.raiMovie',
      'rai.raiPremium',
      'rai.raiGulp',
      'rai.raiYoyo',
      'rai.raiNews',
      'rai.raiStoria',
      'rai.raiScuola',
      'sky.arte',

      // Sport
      'rai.raiSport',
      'rai.raiSport+',
      'sportItalia.sportItalia',

      // News
      'sky.tg24',
      'mediaset.tg24',
      'rai.raiNews',

      // Music
      'mediaset.r101',
      'mediaset.r105',
      'mediaset.virgin',
      'mediaset.rmc',

      // Romania
      'protv.protv',
      'protv.protv2',
      'protv.prox',
      'protv.progold',
      'protv.procinema',
    ]
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
      baseUrl: process.env.SITE_URL + '/sky/proxy?id=${code}&isMobile=false',
      groupTitle: 'Sky',
      channels: require('./channels/sky')
    }, {
      baseUrl: 'http://viacomitalytest-lh.akamaihd.net/i/sbshdlive_1@${code}/master.m3u8',
      groupTitle: 'Paramount',
      channels: require('./channels/paramount')
    }, {
      baseUrl: 'https://it.dplay.com/ajax/playbackjson/channel/${code}',
      groupTitle: 'Discovery',
      channels: require('./channels/discovery')
    }, {
      baseUrl: 'https://www.sportitalia.com/api/v2/content/57561/access',
      groupTitle: 'SportItalia',
      channels: require('./channels/other').sportItalia
    }, {
      baseUrl: 'https://vid.hls.protv.ro/${code}',
      groupTitle: 'ProTv',
      channels: require('./channels/proTv')
    }
  ]
}