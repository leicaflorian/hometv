"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicChannel_1 = require("./BasicChannel");
class SkyChannels extends BasicChannel_1.BasicChannel {
    async workflow() {
        const url = this.preparedUrl();
        const result = await this.axiosCall({
            url,
            method: "get",
            withCredentials: true,
            headers: {
                origin: 'https://www.cielotv.it',
                referer: 'https://www.cielotv.it/',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36'
            }
        });
        return result.data.streaming_url;
    }
}
module.exports = SkyChannels;
//# sourceMappingURL=SkyChannels.js.map