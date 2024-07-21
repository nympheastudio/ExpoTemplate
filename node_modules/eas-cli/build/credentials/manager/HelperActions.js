"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PressAnyKeyToContinue = void 0;
const tslib_1 = require("tslib");
const log_1 = tslib_1.__importDefault(require("../../log"));
const prompts_1 = require("../../prompts");
class PressAnyKeyToContinue {
    async runAsync() {
        log_1.default.log('Press any key to continue...');
        await (0, prompts_1.pressAnyKeyToContinueAsync)();
        log_1.default.newLine();
        log_1.default.newLine();
    }
}
exports.PressAnyKeyToContinue = PressAnyKeyToContinue;
