"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const spawn_async_1 = tslib_1.__importDefault(require("@expo/spawn-async"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const path_1 = tslib_1.__importDefault(require("path"));
const git_1 = tslib_1.__importDefault(require("./git"));
const log_1 = tslib_1.__importDefault(require("../../log"));
const local_1 = require("../local");
class GitNoCommitClient extends git_1.default {
    async isCommitRequiredAsync() {
        return false;
    }
    async getRootPathAsync() {
        return (await (0, spawn_async_1.default)('git', ['rev-parse', '--show-toplevel'])).stdout.trim();
    }
    async makeShallowCopyAsync(destinationPath) {
        // normalize converts C:/some/path to C:\some\path on windows
        const srcPath = path_1.default.normalize(await this.getRootPathAsync());
        await (0, local_1.makeShallowCopyAsync)(srcPath, destinationPath);
    }
    async isFileIgnoredAsync(filePath) {
        // normalize converts C:/some/path to C:\some\path on windows
        const rootPath = path_1.default.normalize(await this.getRootPathAsync());
        const ignore = new local_1.Ignore(rootPath);
        await ignore.initIgnoreAsync();
        return ignore.ignores(filePath);
    }
    async trackFileAsync(file) {
        try {
            await super.trackFileAsync(file);
        }
        catch {
            // In the no commit workflow it doesn't matter if we fail to track changes,
            // so we can ignore if this throws an exception
            log_1.default.warn(`Unable to track ${chalk_1.default.bold(path_1.default.basename(file))} in Git. Proceeding without tracking.`);
            log_1.default.warn(`  Reason: the command ${chalk_1.default.bold(`"git add ${file}"`)} exited with an error.`);
            log_1.default.newLine();
        }
    }
}
exports.default = GitNoCommitClient;
