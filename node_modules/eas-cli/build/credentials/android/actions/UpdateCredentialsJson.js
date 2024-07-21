"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCredentialsJson = void 0;
const tslib_1 = require("tslib");
const log_1 = tslib_1.__importDefault(require("../../../log"));
const update_1 = require("../../credentialsJson/update");
class UpdateCredentialsJson {
    async runAsync(ctx, buildCredentials) {
        log_1.default.log('Updating Android credentials in credentials.json');
        await (0, update_1.updateAndroidCredentialsAsync)(ctx, buildCredentials);
        log_1.default.succeed('Android part of your local credentials.json is synced with values stored on EAS servers.');
    }
}
exports.UpdateCredentialsJson = UpdateCredentialsJson;
