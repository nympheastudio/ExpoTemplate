"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ContextField_1 = tslib_1.__importDefault(require("./ContextField"));
const findProjectDirAndVerifyProjectSetupAsync_1 = require("./contextUtils/findProjectDirAndVerifyProjectSetupAsync");
class ProjectDirContextField extends ContextField_1.default {
    async getValueAsync() {
        return await (0, findProjectDirAndVerifyProjectSetupAsync_1.findProjectDirAndVerifyProjectSetupAsync)();
    }
}
exports.default = ProjectDirContextField;
