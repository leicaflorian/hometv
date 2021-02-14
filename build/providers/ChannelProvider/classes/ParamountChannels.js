"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicChannel_1 = require("./BasicChannel");
class ParamountChannels extends BasicChannel_1.BasicChannel {
    async workflow() {
        return this.preparedUrl();
    }
}
module.exports = ParamountChannels;
//# sourceMappingURL=ParamountChannels.js.map