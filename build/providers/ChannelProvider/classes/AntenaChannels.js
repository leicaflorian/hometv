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
const jsdom = __importStar(require("jsdom"));
const BasicChannel_1 = require("./BasicChannel");
const qs_1 = __importDefault(require("qs"));
const tough = __importStar(require("tough-cookie"));
const axios_cookiejar_support_1 = __importDefault(require("axios-cookiejar-support"));
class AntenaChannels extends BasicChannel_1.BasicChannel {
    constructor() {
        super(...arguments);
        this.JSDOM = jsdom.JSDOM;
        this.loginSession = null;
    }
    async login() {
        const loginUrl = "https://antenaplay.ro/intra-in-cont";
        axios_cookiejar_support_1.default(this.axiosCall);
        let cookieJar = new tough.CookieJar();
        const dom = await this.JSDOM.fromURL(loginUrl, {
            pretendToBeVisual: true,
            cookieJar: cookieJar
        });
        const document = dom.window.document;
        const token = document.querySelector("[name='_token']").value;
        try {
            const loginResult = await this.axiosCall.post(loginUrl, qs_1.default.stringify({
                email: "florian.leica@gmail.com",
                password: "mU50j46EKiif",
                _token: token
            }), {
                jar: cookieJar,
                withCredentials: true,
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                }
            });
            const channelPage = await this.JSDOM.fromURL("https://antenaplay.ro/live/antena1", {
                pretendToBeVisual: true,
                cookieJar: cookieJar,
            });
            const documentChannel = dom.serialize();
            channelPage;
        }
        catch (er) {
            console.log(er);
        }
    }
    async workflow() {
        const channel = this.getChannel();
        let result = "";
        await this.login();
        try {
            return "";
        }
        catch (er) {
            return "";
        }
    }
}
module.exports = AntenaChannels;
//# sourceMappingURL=AntenaChannels.js.map