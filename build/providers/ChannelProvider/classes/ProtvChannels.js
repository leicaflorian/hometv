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
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom = __importStar(require("jsdom"));
const BasicChannel_1 = require("./BasicChannel");
class ProtvChannels extends BasicChannel_1.BasicChannel {
    async workflow() {
        const { JSDOM } = jsdom;
        const channel = this.getChannel();
        let result = "";
        try {
            const dom = await JSDOM.fromURL(channel === null || channel === void 0 ? void 0 : channel.embed);
            const document = dom.window.document;
            for (const script of document.scripts) {
                if (script.text.includes("Player.init")) {
                    const match = script.textContent.match(/(src).*(m3u8)/)[0];
                    result = match.replace(/src.*"/, "");
                }
            }
            return result.replace(/\\/g, "");
        }
        catch (er) {
            return "";
        }
    }
}
module.exports = ProtvChannels;
//# sourceMappingURL=ProtvChannels.js.map