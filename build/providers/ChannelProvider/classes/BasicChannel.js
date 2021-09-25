"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicChannel = void 0;
const axios_1 = __importDefault(require("axios"));
const lodash_1 = require("lodash");
class BasicChannel {
    constructor(groupData) {
        this.groupData = groupData;
        this.axiosCall = axios_1.default;
    }
    async handle(channel) {
        this.channel = channel;
        try {
            return this.workflow();
        }
        catch (er) {
            console.error(er);
            throw er;
        }
    }
    preparedUrl() {
        const channel = this.groupData.channels.find(_channel => _channel.id === this.channel);
        const urlTmpl = lodash_1.template(this.groupData.baseUrl);
        if (!channel) {
            throw new Error("Channel not found: " + this.channel);
        }
        return urlTmpl({
            code: channel.code
        });
    }
    getChannel() {
        const result = this.groupData.channels.find(_channel => _channel.id === this.channel);
        return result || null;
    }
}
exports.BasicChannel = BasicChannel;
//# sourceMappingURL=BasicChannel.js.map