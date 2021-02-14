"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicChannel_1 = require("./BasicChannel");
class ProtvChannels extends BasicChannel_1.BasicChannel {
    async workflow() {
        return this.preparedUrl();
    }
}
module.exports = ProtvChannels;
//# sourceMappingURL=ProtvChannels.js.map