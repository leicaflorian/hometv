"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelsHandler = void 0;
const Config_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Config"));
const lodash_1 = require("lodash");
class ChannelsHandler {
    constructor() {
        this.config = Config_1.default.get("channels");
        this.IptvList = [];
        this.ChannelsList = [];
        this.channelsInstances = {};
        const lists = this.initIptvList();
        this.IptvList = lists.iptvList;
        this.ChannelsList = lists.channelsList;
    }
    get iptvList() {
        return this.IptvList.join("\n");
    }
    get channelsList() {
        return this.ChannelsList;
    }
    async getChannel(group, channel) {
        let channelInstance = lodash_1.get(this.channelsInstances, `${group}`);
        if (!channelInstance) {
            const className = lodash_1.upperFirst(lodash_1.camelCase(group)) + "Channels";
            const classToUse = (await Promise.resolve().then(() => __importStar(require(`./classes/${className}`)))).default;
            const groupData = this.config.groups.find(_group => _group.groupTitle.toLowerCase() === group.toLowerCase());
            lodash_1.set(this.channelsInstances, `${group}`, new classToUse(groupData));
            channelInstance = lodash_1.get(this.channelsInstances, `${group}`);
        }
        return await channelInstance.handle(channel);
    }
    getLogoUrl(channel) {
        const logo = lodash_1.template(this.config.tvg.logosUrl);
        if (channel.tvgLogo.startsWith("http")) {
            return channel.tvgLogo;
        }
        return logo({ id: channel.tvgLogo });
    }
    initIptvList() {
        const content = ['#EXTM3U'];
        const channelsIptvList = [];
        let channelsList = [];
        for (const group of this.config.groups) {
            const groupId = group.groupTitle.toLowerCase();
            const groupChannels = group.channels;
            for (const channel of groupChannels) {
                const logo = this.getLogoUrl(channel);
                const orderId = this.config.tvg.order.indexOf(`${groupId}.${channel.id}`);
                const order = orderId >= 0 ? orderId + 1 : orderId;
                channelsList.push({
                    ...channel,
                    order,
                    tvgLogo: logo,
                    groupTitle: group.groupTitle,
                    url: `${process.env.SITE_URL}/${groupId}/${channel.id}`
                });
                channelsIptvList.push({
                    order: order,
                    row1: [
                        `#EXTINF:${order}`,
                        `tvg-id="${channel.tvgId || channel.id || 'EPG N/A'}"`,
                        `tvg-name="${channel.tvgName || channel.name || ''}"`,
                        `tvg-shift="${channel.tvgShift || ''}"`,
                        `tvg-logo="${logo}"`,
                        `radio="${channel.radio || ''}"`,
                        `group-title="${group.groupTitle || ''}"`,
                        `, ${channel.name}`
                    ].join(" "),
                    row2: `${process.env.SITE_URL}/${groupId}/${channel.id}`
                });
            }
        }
        content.push(...lodash_1.sortBy(channelsIptvList, 'order').map(_entry => _entry.row1 + '\n' + _entry.row2));
        channelsList = lodash_1.sortBy(channelsList, 'order');
        return {
            iptvList: content,
            channelsList
        };
    }
}
exports.ChannelsHandler = ChannelsHandler;
//# sourceMappingURL=provider.js.map