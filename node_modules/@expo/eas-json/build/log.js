"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.link = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const terminal_link_1 = tslib_1.__importDefault(require("terminal-link"));
// link function from packages/eas-cli/src/log.ts
function link(url, { text = url, dim = true } = {}) {
    let output;
    if (terminal_link_1.default.isSupported) {
        output = (0, terminal_link_1.default)(text, url);
    }
    else {
        output = `${text === url ? '' : text + ': '}${chalk_1.default.underline(url)}`;
    }
    return dim ? chalk_1.default.dim(output) : output;
}
exports.link = link;
