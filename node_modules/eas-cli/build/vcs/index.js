"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveVcsClient = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const git_1 = tslib_1.__importDefault(require("./clients/git"));
const gitNoCommit_1 = tslib_1.__importDefault(require("./clients/gitNoCommit"));
const noVcs_1 = tslib_1.__importDefault(require("./clients/noVcs"));
const NO_VCS_WARNING = `Using EAS CLI without version control system is not recommended, use this mode only if you know what you are doing.`;
function resolveVcsClient(requireCommit = false) {
    if (process.env.EAS_NO_VCS) {
        if (process.env.NODE_ENV !== 'test') {
            // This log might be printed before cli arguments are evaluated,
            // so it needs to go to stderr in case command is run in JSON
            // only mode.
            // eslint-disable-next-line no-console
            console.error(chalk_1.default.yellow(NO_VCS_WARNING));
        }
        return new noVcs_1.default();
    }
    if (requireCommit) {
        return new git_1.default();
    }
    return new gitNoCommit_1.default();
}
exports.resolveVcsClient = resolveVcsClient;
