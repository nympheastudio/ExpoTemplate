"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printSummary = exports.formatArchiveSourceSummary = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const generated_1 = require("../../graphql/generated");
const log_1 = tslib_1.__importDefault(require("../../log"));
const formatFields_1 = tslib_1.__importDefault(require("../../utils/formatFields"));
const ArchiveSource_1 = require("../ArchiveSource");
function formatSubmissionBuildSummary(build) {
    const fields = [
        {
            label: 'Build ID',
            value: build.id,
        },
        {
            label: 'Build Date',
            value: new Date(build.createdAt).toLocaleString(),
        },
        {
            label: 'App Version',
            value: build.appVersion,
        },
        {
            label: build.platform === generated_1.AppPlatform.Android ? 'Version code' : 'Build number',
            value: build.appBuildVersion,
        },
    ];
    const filteredFields = fields.filter(({ value }) => value !== undefined && value !== null);
    return ('\n' +
        (0, formatFields_1.default)(filteredFields, {
            labelFormat: label => `    ${chalk_1.default.dim(label)}:`,
        }));
}
function formatArchiveSourceSummary(archive) {
    const summarySlice = {};
    switch (archive.sourceType) {
        case ArchiveSource_1.ArchiveSourceType.gcs:
            summarySlice.archivePath = archive.localSource.path;
            break;
        case ArchiveSource_1.ArchiveSourceType.url:
            summarySlice.archiveUrl = archive.url;
            break;
        case ArchiveSource_1.ArchiveSourceType.build:
            summarySlice.formattedBuild = formatSubmissionBuildSummary(archive.build);
            break;
    }
    return summarySlice;
}
exports.formatArchiveSourceSummary = formatArchiveSourceSummary;
function printSummary(summary, keyMap) {
    const fields = [];
    for (const [key, value] of Object.entries(summary)) {
        const label = `${keyMap[key]}:`;
        fields.push({ label, value });
    }
    log_1.default.addNewLineIfNone();
    log_1.default.log((0, formatFields_1.default)(fields, { labelFormat: chalk_1.default.bold.cyan }));
    log_1.default.addNewLineIfNone();
}
exports.printSummary = printSummary;
