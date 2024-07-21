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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.cancel = exports.render = exports.format = void 0;
var _1 = require(".");
Object.defineProperty(exports, "format", { enumerable: true, get: function () { return _1.format; } });
Object.defineProperty(exports, "render", { enumerable: true, get: function () { return _1.render; } });
Object.defineProperty(exports, "cancel", { enumerable: true, get: function () { return _1.cancel; } });
Object.defineProperty(exports, "register", { enumerable: true, get: function () { return _1.register; } });
var Languages = __importStar(require("./lang"));
Object.keys(Languages).forEach(function (locale) {
    _1.register(locale, Languages[locale]);
});
__exportStar(require("./interface"), exports);
//# sourceMappingURL=full.js.map