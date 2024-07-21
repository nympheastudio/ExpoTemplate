"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eas_json_1 = require("@expo/eas-json");
const ContextField_1 = tslib_1.__importDefault(require("./ContextField"));
const findProjectDirAndVerifyProjectSetupAsync_1 = require("./contextUtils/findProjectDirAndVerifyProjectSetupAsync");
const vcs_1 = require("../../vcs");
class VcsClientContextField extends ContextField_1.default {
    async getValueAsync({ vcsClientOverride }) {
        if (vcsClientOverride) {
            return vcsClientOverride;
        }
        const projectDir = await (0, findProjectDirAndVerifyProjectSetupAsync_1.findProjectDirAndVerifyProjectSetupAsync)();
        const easJsonAccessor = eas_json_1.EasJsonAccessor.fromProjectPath(projectDir);
        const config = await eas_json_1.EasJsonUtils.getCliConfigAsync(easJsonAccessor);
        return (0, vcs_1.resolveVcsClient)(config?.requireCommit);
    }
}
exports.default = VcsClientContextField;
