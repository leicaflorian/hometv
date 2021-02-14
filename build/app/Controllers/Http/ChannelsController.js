"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ioc_Channels_1 = __importDefault(global[Symbol.for('ioc.use')]("Channels"));
class ChannelsController {
    constructor(app) {
        this.app = app;
    }
    async getIptvList({ request, response }) {
        const stream = _ioc_Channels_1.default.iptvList;
        const returnText = request.get()["only_text"];
        const returnJson = request.get()["only_json"];
        if (returnJson) {
            response.header('Content-Type', 'application/json');
            return _ioc_Channels_1.default.channelsList;
        }
        if (!returnText) {
            response.header('Content-Type', 'application/x-mpegURL');
        }
        response.send(stream);
    }
    async getChannel({ params, response }) {
        const group = params.group;
        const channel = params.channel;
        const url = await _ioc_Channels_1.default.getChannel(group, channel);
        return url;
        response.redirect(url);
    }
}
exports.default = ChannelsController;
//# sourceMappingURL=ChannelsController.js.map