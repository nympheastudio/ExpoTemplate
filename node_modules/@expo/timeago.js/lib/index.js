"use strict";
/**
 * Created by hustcc on 18/5/20.
 * Contract: i@hust.cc
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
var en_US_1 = __importDefault(require("./lang/en_US"));
var register_1 = require("./register");
Object.defineProperty(exports, "register", { enumerable: true, get: function () { return register_1.register; } });
register_1.register('en_US', en_US_1.default);
var format_1 = require("./format");
Object.defineProperty(exports, "format", { enumerable: true, get: function () { return format_1.format; } });
var realtime_1 = require("./realtime");
Object.defineProperty(exports, "render", { enumerable: true, get: function () { return realtime_1.render; } });
Object.defineProperty(exports, "cancel", { enumerable: true, get: function () { return realtime_1.cancel; } });
__exportStar(require("./interface"), exports);
//# sourceMappingURL=index.js.map