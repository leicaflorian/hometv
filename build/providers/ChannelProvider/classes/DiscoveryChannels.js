"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicChannel_1 = require("./BasicChannel");
class DiscoveryChannels extends BasicChannel_1.BasicChannel {
    async getToken(axiosInstance) {
        return axiosInstance.get("/token?realm=dplayit&deviceId=b0146bb46ac9bd694c68ec8ca620291652551a4087fc68dee776189ea54d0d54&shortlived=true");
    }
    async workflow() {
        const axiosInstance = this.axiosCall.create({
            baseURL: 'https://disco-api.discoveryplus.it/',
            timeout: 1000,
            withCredentials: true,
            headers: {
                "x-disco-client": "WEB:UNKNOWN:discoveryplus-player:7e5848f01",
                Connection: "keep-alive",
                Origin: "https://www.discoveryplus.it",
                Pragma: "no-cache",
                Referer: "https://www.discoveryplus.it/",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "cross-site",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
            }
        });
        const token = await this.getToken(axiosInstance);
        const cookies = token.headers["set-cookie"];
        const url = this.preparedUrl();
        try {
            const result = await axiosInstance.get(url, {
                headers: {
                    Cookie: cookies,
                }
            });
            const resp = result.data.data;
            return resp.attributes.streaming.hls.url;
        }
        catch (er) {
            console.log(er);
            return "";
        }
    }
}
module.exports = DiscoveryChannels;
//# sourceMappingURL=DiscoveryChannels.js.map