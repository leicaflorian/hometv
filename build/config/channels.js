"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mediaset_1 = __importDefault(require("Config/channels/mediaset"));
const rai_1 = __importDefault(require("Config/channels/rai"));
const sky_1 = __importDefault(require("Config/channels/sky"));
const paramount_1 = __importDefault(require("Config/channels/paramount"));
const other_1 = __importDefault(require("Config/channels/other"));
const proTv_1 = __importDefault(require("Config/channels/proTv"));
const antena_1 = __importDefault(require("Config/channels/antena"));
const channels = {
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
            'rai.raiSport',
            'rai.raiSport+',
            'sportItalia.sportItalia',
            'sky.tg24',
            'mediaset.tg24',
            'rai.raiNews',
            'mediaset.r101',
            'mediaset.r105',
            'mediaset.virgin',
            'mediaset.rmc',
            'protv.protv',
            'protv.protv2',
            'protv.prox',
            'protv.progold',
            'protv.procinema',
            'antena.antena1'
        ]
    },
    groups: [
        {
            baseUrl: 'https://static3.mediasetplay.mediaset.it/apigw/nownext/${code}.json',
            groupTitle: 'Mediaset',
            channels: mediaset_1.default
        }, {
            baseUrl: 'https://mediapolis.rai.it/relinker/relinkerServlet.htm?cont=${code}',
            groupTitle: 'Rai',
            channels: rai_1.default
        }, {
            baseUrl: 'https://apid.sky.it/vdp/v1/getLivestream?id=${code}&isMobile=false',
            groupTitle: 'Sky',
            channels: sky_1.default
        }, {
            baseUrl: 'http://viacomitalytest-lh.akamaihd.net/i/sbshdlive_1@${code}/master.m3u8',
            groupTitle: 'Paramount',
            channels: paramount_1.default
        },
        {
            baseUrl: 'https://www.sportitalia.com/api/v2/content/57561/access',
            groupTitle: 'SportItalia',
            channels: other_1.default.sportItalia
        }, {
            baseUrl: 'https://cmero-ott-live-sec.ssl.cdn.cra.cz/${key}/channels/cme-ro-${code}/playlist.m3u8',
            groupTitle: 'ProTv',
            channels: proTv_1.default
        }, {
            baseUrl: '',
            groupTitle: 'Antena',
            channels: antena_1.default
        }
    ]
};
exports.default = channels;
//# sourceMappingURL=channels.js.map