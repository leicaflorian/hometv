"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const provider_1 = require("./provider");
class Index {
    constructor(app) {
        this.app = app;
    }
    async register() {
        this.app.singleton('Channels', () => {
            const channelsHanlder = new provider_1.ChannelsHandler();
            return channelsHanlder;
        });
    }
    async boot() {
        this.app.use('Channels');
    }
    async ready() {
    }
    async shutdown() {
    }
}
exports.default = Index;
//# sourceMappingURL=index.js.map