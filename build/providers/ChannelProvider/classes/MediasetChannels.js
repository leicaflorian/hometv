"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicChannel_1 = require("./BasicChannel");
class MediasetChannels extends BasicChannel_1.BasicChannel {
    async workflow() {
        const url = this.preparedUrl();
        const result = await this.axiosCall({
            url,
            method: "get"
        });
        const urlList = result.data.response.tuningInstruction['urn:theplatform:tv:location:any'];
        const mpegUrl = urlList.find(urlObject => urlObject.format === 'application/x-mpegURL');
        return mpegUrl.publicUrls[0];
    }
}
module.exports = MediasetChannels;
//# sourceMappingURL=MediasetChannels.js.map