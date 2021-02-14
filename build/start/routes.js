"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.on('/').render('index');
Route_1.default.get('/:group/:channel', "ChannelsController.getChannel");
Route_1.default.get('/list', "ChannelsController.getIptvList");
//# sourceMappingURL=routes.js.map