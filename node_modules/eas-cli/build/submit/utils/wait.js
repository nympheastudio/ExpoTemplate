"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForSubmissionsEndAsync = void 0;
const tslib_1 = require("tslib");
const nullthrows_1 = tslib_1.__importDefault(require("nullthrows"));
const generated_1 = require("../../graphql/generated");
const SubmissionQuery_1 = require("../../graphql/queries/SubmissionQuery");
const log_1 = tslib_1.__importDefault(require("../../log"));
const ora_1 = require("../../ora");
const promise_1 = require("../../utils/promise");
const APP_STORE_NAMES = {
    [generated_1.AppPlatform.Android]: 'Google Play Store',
    [generated_1.AppPlatform.Ios]: 'Apple App Store Connect',
};
const CHECK_INTERVAL_MS = 5000;
async function waitForSubmissionsEndAsync(graphqlClient, initialSubmissions) {
    log_1.default.log(`Waiting for submission${initialSubmissions.length > 1 ? 's' : ''} to complete. You can press Ctrl+C to exit.`);
    const spinner = (0, ora_1.ora)(`Submitting`).start();
    while (true) {
        const submissions = await Promise.all(initialSubmissions.map(({ id }) => {
            try {
                return SubmissionQuery_1.SubmissionQuery.byIdAsync(graphqlClient, id, { useCache: false });
            }
            catch (err) {
                log_1.default.debug('Failed to fetch the submission status', err);
                return null;
            }
        }));
        if (submissions.length === 1) {
            const [submission] = submissions;
            if (submission !== null) {
                spinner.text = getSingleSpinnerText(submission);
                if (submission.status === generated_1.SubmissionStatus.Finished) {
                    spinner.succeed();
                    return [submission];
                }
                else if (submission.status === generated_1.SubmissionStatus.Errored) {
                    spinner.fail();
                    return [submission];
                }
                else if (submission.status === generated_1.SubmissionStatus.Canceled) {
                    spinner.warn();
                    return [submission];
                }
            }
            else {
                if (!spinner.text) {
                    spinner.text =
                        'Could not fetch the submission status. Check your network connection. If the problem persists re-run the command with the EXPO_DEBUG=1 environment variable.';
                }
            }
        }
        else {
            spinner.text = getMultipleSpinnerText(submissions);
            const finished = countWithStatus(submissions, generated_1.SubmissionStatus.Finished);
            const errored = countWithStatus(submissions, generated_1.SubmissionStatus.Errored);
            const canceled = countWithStatus(submissions, generated_1.SubmissionStatus.Canceled);
            const nonCompleted = submissions.length - (finished + errored + canceled);
            if (nonCompleted === 0) {
                if (finished === submissions.length) {
                    spinner.succeed('All submissions have finished');
                }
                else {
                    spinner.fail('Some submissions were canceled or failed');
                }
                return submissions.map(s => (0, nullthrows_1.default)(s));
            }
        }
        await (0, promise_1.sleepAsync)(CHECK_INTERVAL_MS);
    }
}
exports.waitForSubmissionsEndAsync = waitForSubmissionsEndAsync;
function getSingleSpinnerText(submission) {
    const { platform, status } = submission;
    const appStoreName = APP_STORE_NAMES[platform];
    switch (status) {
        case generated_1.SubmissionStatus.AwaitingBuild:
            return `Submitting your app to ${appStoreName}: waiting for the associated build to complete`;
        case generated_1.SubmissionStatus.InQueue:
            return `Submitting your app to ${appStoreName}: waiting for an available submitter`;
        case generated_1.SubmissionStatus.InProgress:
            return `Submitting your app to ${appStoreName}: submission in progress`;
        case generated_1.SubmissionStatus.Finished:
            return `Submitted your app to ${appStoreName}!`;
        case generated_1.SubmissionStatus.Errored:
            return `Something went wrong when submitting your app to ${appStoreName}.`;
        case generated_1.SubmissionStatus.Canceled:
            return 'The submission has been canceled';
    }
}
function getMultipleSpinnerText(submissions) {
    const awaitingSubmissions = countWithStatus(submissions, generated_1.SubmissionStatus.AwaitingBuild);
    const inQueue = countWithStatus(submissions, generated_1.SubmissionStatus.InQueue);
    const inProgress = countWithStatus(submissions, generated_1.SubmissionStatus.InProgress);
    const finished = countWithStatus(submissions, generated_1.SubmissionStatus.Finished);
    const errored = countWithStatus(submissions, generated_1.SubmissionStatus.Errored);
    const canceled = countWithStatus(submissions, generated_1.SubmissionStatus.Canceled);
    const unknown = submissions.length - awaitingSubmissions - inQueue - inProgress - finished - errored - canceled;
    const text = [
        awaitingSubmissions && `Awaiting submissions: ${awaitingSubmissions}`,
        inQueue && `Submissions in queue: ${inQueue}`,
        inProgress && `Submissions in progress: ${inProgress}`,
        canceled && `Canceled submissions: ${canceled}`,
        errored && `Failed submissions: ${errored}`,
        finished && `Finished submissions: ${finished}`,
        unknown && `Submissions with unknown status: ${unknown}`,
    ]
        .filter(i => i)
        .join('\t');
    return text;
}
function countWithStatus(submissions, status) {
    return submissions.filter(submission => submission?.status === status).length;
}
