"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshContextSubmitProfileAsync = exports.resolveArchiveSource = void 0;
const tslib_1 = require("tslib");
const eas_json_1 = require("@expo/eas-json");
const errors_1 = require("@expo/eas-json/build/errors");
const ArchiveSource_1 = require("./ArchiveSource");
const log_1 = tslib_1.__importDefault(require("../log"));
function resolveArchiveSource(ctx) {
    const { url, path, id, latest } = ctx.archiveFlags;
    const chosenOptions = [url, path, id, latest];
    if (chosenOptions.filter(opt => opt).length > 1) {
        throw new Error(`Pass only one of: --url, --path, --id, --latest`);
    }
    if (url) {
        return {
            sourceType: ArchiveSource_1.ArchiveSourceType.url,
            url,
        };
    }
    else if (path) {
        return {
            sourceType: ArchiveSource_1.ArchiveSourceType.path,
            path,
        };
    }
    else if (id) {
        if (!(0, ArchiveSource_1.isUuidV4)(id)) {
            throw new Error(`${id} is not a valid ID`);
        }
        return {
            sourceType: ArchiveSource_1.ArchiveSourceType.buildId,
            id,
        };
    }
    else if (latest) {
        return {
            sourceType: ArchiveSource_1.ArchiveSourceType.latest,
        };
    }
    else if (ctx.nonInteractive) {
        throw new Error('You need to specify the archive source when running in non-interactive mode ');
    }
    else {
        return {
            sourceType: ArchiveSource_1.ArchiveSourceType.prompt,
        };
    }
}
exports.resolveArchiveSource = resolveArchiveSource;
async function refreshContextSubmitProfileAsync(ctx, archiveProfile) {
    try {
        ctx.profile = (await eas_json_1.EasJsonUtils.getSubmitProfileAsync(eas_json_1.EasJsonAccessor.fromProjectPath(ctx.projectDir), ctx.platform, archiveProfile ? archiveProfile : 'production'));
    }
    catch (err) {
        if (err instanceof errors_1.MissingProfileError) {
            log_1.default.log(`Selected build uses "${archiveProfile}" build profile but a submit profile with the same name is missing in eas.json. Using default ("production") profile`);
        }
        else {
            throw err;
        }
    }
    return ctx;
}
exports.refreshContextSubmitProfileAsync = refreshContextSubmitProfileAsync;
