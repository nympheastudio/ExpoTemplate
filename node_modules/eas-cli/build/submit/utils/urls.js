"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubmissionDetailsUrl = exports.printSubmissionDetailsUrls = void 0;
const tslib_1 = require("tslib");
const url_1 = require("url");
const api_1 = require("../../api");
const log_1 = tslib_1.__importStar(require("../../log"));
const platform_1 = require("../../platform");
function printSubmissionDetailsUrls(submissions) {
    if (submissions.length === 1) {
        const [submission] = submissions;
        log_1.default.log(`Submission details: ${(0, log_1.link)(getSubmissionDetailsUrl(submission))}`);
    }
    else {
        submissions.forEach(submission => {
            log_1.default.log(`${platform_1.appPlatformDisplayNames[submission.platform]} submission details: ${(0, log_1.link)(getSubmissionDetailsUrl(submission))}`);
        });
    }
}
exports.printSubmissionDetailsUrls = printSubmissionDetailsUrls;
function getSubmissionDetailsUrl(submission) {
    const { id, app } = submission;
    return new url_1.URL(`/accounts/${app.ownerAccount.name}/projects/${app.slug}/submissions/${id}`, (0, api_1.getExpoWebsiteBaseUrl)()).toString();
}
exports.getSubmissionDetailsUrl = getSubmissionDetailsUrl;
