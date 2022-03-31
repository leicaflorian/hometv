import {ChannelsConfig} from "../types/ChannelsConfig";
import mediaset from "Config/channels/mediaset";
import rai from "Config/channels/rai";
import sky from "Config/channels/sky";
import paramount from "Config/channels/paramount";
import discovery from "Config/channels/discovery";
import other from "Config/channels/other";
import antena from "Config/channels/antena";

/**
 * usefull lists
 * https://raw.githubusercontent.com/carinside/test/tutorial/playlist.m3u
 */

const channels: ChannelsConfig = {
  tvg: {
    logosUrl:
      "https://api.superguidatv.it/v1/channels/${id}/logo?width=120&theme=dark",
    order: [
      "rai.rai1",
      "rai.rai2",
      "rai.rai3",
      "mediaset.r4",
      "mediaset.c5",
      "mediaset.i1",
      "mediaset.20",
      "mediaset.focus",
      "mediaset.extra",
      "mediaset.i2",
      "mediaset.la5",
      "mediaset.iris",
      "mediaset.topc",
      "mediaset.c34",
      "mediaset.27",
      "mediaset.boing",
      "mediaset.cartoon",
      "super.super",
      "rai.raiGulp",
      "rai.raiYoyo",
      "la7.la7",
      "la7.la7d",
      "discovery.dmax",
      "discovery.nove",
      "discovery.realtime",
      "discovery.food",
      "discovery.giallo",
      /* "discovery.k2",
      "discovery.frisbee", */
      "sky.tv8",
      "sky.cielo",
      // "paramount.spike",
      // "paramount.paramount",
      "rai.rai4",
      "rai.rai5",
      "rai.raiMovie",
      "rai.raiPremium",
      
      "rai.raiNews",
      "rai.raiStoria",
      "rai.raiScuola",
      "sky.arte",
      
      // Sport
      "rai.raiSport",
      "rai.raiSportPiuHd",
      "sportItalia.sportItalia",
      
      // News
      "sky.tg24",
      "mediaset.tg24",
      "rai.raiNews24",
      
      // Music
      "mediaset.r101",
      "mediaset.r105",
      "mediaset.virgin",
      "mediaset.rmc",
      "rai.raiRadio2",
      "paramount.vh1",
      
      // Romania
      /* "protv.protv",
      "protv.protv2",
      "protv.prox",
      "protv.progold",
      "protv.procinema", */
      
      "antena.comedy",
      "antena.cook",
      "antena.monden",
    ],
  },
  groups: [
    {
      baseUrl:
        "https://static3.mediasetplay.mediaset.it/apigw/nownext/${code}.json",
      groupTitle: "Mediaset",
      channels: mediaset,
    },
    {
      baseUrl: "https://www.raiplay.it/dirette/${code}.json",
      //"https://mediapolis.rai.it/relinker/relinkerServlet.htm?cont=${code}",
      groupTitle: "Rai",
      channels: rai,
    },
    {
      // url normale non va per via dei cors su tivumate
      // baseUrl: "https://apid.sky.it/vdp/v1/getLivestream?id=${code}&isMobile=false",
      baseUrl: "https://www.mytivu.it/Application/Channels/${code}.php",
      groupTitle: "Sky",
      channels: sky,
    },
    {
      baseUrl:
        "http://viacomitalytest-lh.akamaihd.net/i/sbshdlive_1@${code}/master.m3u8",
      groupTitle: "Paramount",
      channels: paramount,
    },
    {
      baseUrl:
      //"https://eu2-prod.disco-api.com/playback/videoPlaybackInfo/${code}?usePreAuth=true",
      //"https://disco-api.discoveryplus.it/playback/v2/channelPlaybackInfo/${code}?usePreAuth=true",
        "https://sbshdlu5-lh.akamaihd.net/i/${code}/master.m3u8",
      groupTitle: "Discovery",
      channels: discovery,
    },
    {
      baseUrl: "https://www.sportitalia.com/api/v2/content/57561/access",
      groupTitle: "SportItalia",
      channels: other.sportItalia,
    },
    {
      baseUrl: "https://d15umi5iaezxgx.cloudfront.net/${code}/CLN/HLS-B/Live.m3u8",
      groupTitle: "La7",
      channels: other.la7,
    },
    {
      baseUrl: "https://viacomitalytest-lh.akamaihd.net/i/sbshdlive_1@357018/master.m3u8",
      groupTitle: "Super",
      channels: other.super,
    },
    /*  {
      // baseUrl: 'https://vid.hls.protv.ro/${code}',
      baseUrl:
        "https://cmero-ott-live-sec.ssl.cdn.cra.cz/${key}/channels/cme-ro-${code}/playlist.m3u8",
      groupTitle: "ProTv",
      channels: proTv,
    }, */
    {
      baseUrl:
        "https://stream1.antenaplay.ro/live/smil:${code}.smil/playlist.m3u8",
      groupTitle: "Antena",
      channels: antena,
    },
  ],
};

export default channels;
