"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicChannel_1 = require("./BasicChannel");
class SkyChannels extends BasicChannel_1.BasicChannel {
    async workflow() {
        const url = this.preparedUrl();
        try {
            const result = await this.axiosCall({
                url,
                method: "get",
            });
            return result.data;
        }
        catch (er) {
            console.error(er);
            return er;
        }
    }
}
module.exports = SkyChannels;
//# sourceMappingURL=SkyChannels.js.map