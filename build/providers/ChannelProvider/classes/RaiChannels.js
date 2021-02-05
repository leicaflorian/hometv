"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicChannel_1 = require("./BasicChannel");
class RaiChannels extends BasicChannel_1.BasicChannel {
    async workflow() {
        return this.preparedUrl();
    }
}
exports.default = RaiChannels;
//# sourceMappingURL=RaiChannels.js.map