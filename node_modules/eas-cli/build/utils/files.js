"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatBytes = exports.maybeRenameExistingFileAsync = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
const log_1 = tslib_1.__importDefault(require("../log"));
function getRenamedFilename(filename, num) {
    const ext = path_1.default.extname(filename);
    const basename = path_1.default.basename(filename, ext);
    return `${basename}_OLD_${num}${ext}`;
}
async function maybeRenameExistingFileAsync(projectDir, filename) {
    const desiredFilePath = path_1.default.resolve(projectDir, filename);
    if (await fs_extra_1.default.pathExists(desiredFilePath)) {
        let num = 1;
        while (await fs_extra_1.default.pathExists(path_1.default.resolve(projectDir, getRenamedFilename(filename, num)))) {
            num++;
        }
        log_1.default.log(`\nA file already exists at "${desiredFilePath}"\n  Renaming the existing file to ${getRenamedFilename(filename, num)}\n`);
        await fs_extra_1.default.rename(desiredFilePath, path_1.default.resolve(projectDir, getRenamedFilename(filename, num)));
    }
}
exports.maybeRenameExistingFileAsync = maybeRenameExistingFileAsync;
function formatBytes(bytes) {
    if (bytes === 0) {
        return `0`;
    }
    let multiplier = 1;
    if (bytes < 1024 * multiplier) {
        return `${Math.floor(bytes)} B`;
    }
    multiplier *= 1024;
    if (bytes < 102.4 * multiplier) {
        return `${(bytes / multiplier).toFixed(1)} KB`;
    }
    if (bytes < 1024 * multiplier) {
        return `${Math.floor(bytes / 1024)} KB`;
    }
    multiplier *= 1024;
    if (bytes < 102.4 * multiplier) {
        return `${(bytes / multiplier).toFixed(1)} MB`;
    }
    if (bytes < 1024 * multiplier) {
        return `${Math.floor(bytes / multiplier)} MB`;
    }
    multiplier *= 1024;
    if (bytes < 102.4 * multiplier) {
        return `${(bytes / multiplier).toFixed(1)} GB`;
    }
    return `${Math.floor(bytes / 1024)} GB`;
}
exports.formatBytes = formatBytes;
