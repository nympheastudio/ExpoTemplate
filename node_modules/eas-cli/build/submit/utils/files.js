"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAppArchiveAsync = exports.isExistingFileAsync = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const generated_1 = require("../../graphql/generated");
const uploads_1 = require("../../uploads");
const progress_1 = require("../../utils/progress");
async function isExistingFileAsync(filePath) {
    try {
        const stats = await fs_extra_1.default.stat(filePath);
        return stats.isFile();
    }
    catch {
        return false;
    }
}
exports.isExistingFileAsync = isExistingFileAsync;
async function uploadAppArchiveAsync(graphqlClient, path) {
    const fileSize = (await fs_extra_1.default.stat(path)).size;
    const bucketKey = await (0, uploads_1.uploadFileAtPathToGCSAsync)(graphqlClient, generated_1.UploadSessionType.EasSubmitGcsAppArchive, path, (0, progress_1.createProgressTracker)({
        total: fileSize,
        message: 'Uploading to EAS Submit',
        completedMessage: 'Uploaded to EAS Submit',
    }));
    return bucketKey;
}
exports.uploadAppArchiveAsync = uploadAppArchiveAsync;
