"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const ServiceAccountSource_1 = require("./ServiceAccountSource");
const AnalyticsManager_1 = require("../../analytics/AnalyticsManager");
const SubmissionMutation_1 = require("../../graphql/mutations/SubmissionMutation");
const formatFields_1 = tslib_1.__importDefault(require("../../utils/formatFields"));
const BaseSubmitter_1 = tslib_1.__importDefault(require("../BaseSubmitter"));
const summary_1 = require("../utils/summary");
class AndroidSubmitter extends BaseSubmitter_1.default {
    constructor(ctx, options, archive) {
        const sourceOptionsResolver = {
            // eslint-disable-next-line async-protect/async-suffix
            archive: async () => archive,
            // eslint-disable-next-line async-protect/async-suffix
            serviceAccountKeyResult: async () => {
                return await (0, ServiceAccountSource_1.getServiceAccountKeyResultAsync)(this.ctx, this.options.serviceAccountSource);
            },
        };
        const sourceOptionsAnalytics = {
            archive: {
                attemptEvent: AnalyticsManager_1.SubmissionEvent.GATHER_ARCHIVE_ATTEMPT,
                successEvent: AnalyticsManager_1.SubmissionEvent.GATHER_ARCHIVE_SUCCESS,
                failureEvent: AnalyticsManager_1.SubmissionEvent.GATHER_ARCHIVE_FAIL,
            },
            serviceAccountKeyResult: {
                attemptEvent: AnalyticsManager_1.SubmissionEvent.GATHER_CREDENTIALS_ATTEMPT,
                successEvent: AnalyticsManager_1.SubmissionEvent.GATHER_CREDENTIALS_SUCCESS,
                failureEvent: AnalyticsManager_1.SubmissionEvent.GATHER_CREDENTIALS_FAIL,
            },
        };
        super(ctx, options, sourceOptionsResolver, sourceOptionsAnalytics);
    }
    async createSubmissionInputAsync(resolvedSourceOptions) {
        const submissionConfig = this.formatSubmissionConfig(this.options, resolvedSourceOptions);
        (0, summary_1.printSummary)(this.prepareSummaryData(this.options, resolvedSourceOptions), SummaryHumanReadableKeys);
        return {
            projectId: this.options.projectId,
            submissionConfig,
            ...this.formatArchive(resolvedSourceOptions.archive),
        };
    }
    async createPlatformSubmissionAsync({ projectId, submissionConfig, buildId, archiveSource, }) {
        return await SubmissionMutation_1.SubmissionMutation.createAndroidSubmissionAsync(this.ctx.graphqlClient, {
            appId: projectId,
            config: submissionConfig,
            submittedBuildId: buildId,
            archiveSource,
        });
    }
    formatSubmissionConfig(options, { serviceAccountKeyResult }) {
        const { track, releaseStatus, changesNotSentForReview, rollout } = options;
        return {
            track,
            changesNotSentForReview,
            releaseStatus,
            rollout,
            isVerboseFastlaneEnabled: this.ctx.isVerboseFastlaneEnabled,
            ...serviceAccountKeyResult.result,
        };
    }
    prepareSummaryData(options, { archive, serviceAccountKeyResult }) {
        const { projectId, track, releaseStatus, changesNotSentForReview, rollout } = options;
        // structuring order affects table rows order
        return {
            projectId,
            track,
            changesNotSentForReview: changesNotSentForReview ?? undefined,
            releaseStatus: releaseStatus ?? undefined,
            formattedServiceAccount: formatServiceAccountSummary(serviceAccountKeyResult),
            rollout: rollout ?? undefined,
            ...(0, summary_1.formatArchiveSourceSummary)(archive),
        };
    }
}
exports.default = AndroidSubmitter;
const SummaryHumanReadableKeys = {
    archivePath: 'Archive path',
    archiveUrl: 'Download URL',
    changesNotSentForReview: 'Changes not sent for a review',
    formattedBuild: 'Build',
    formattedServiceAccount: 'Google Service Account Key',
    projectId: 'Project ID',
    releaseStatus: 'Release status',
    rollout: 'Rollout',
    track: 'Release track',
};
function formatServiceAccountSummary({ summary }) {
    const { email: serviceAccountEmail, path: serviceAccountKeyPath, source: serviceAccountKeySource, } = summary;
    const fields = [
        {
            label: 'Key Source',
            value: serviceAccountKeySource,
        },
        {
            label: 'Key Path',
            value: serviceAccountKeyPath,
        },
        {
            label: 'Account Email',
            value: serviceAccountEmail,
        },
    ];
    const filteredFields = fields.filter(({ value }) => value !== undefined && value !== null);
    return ('\n' +
        (0, formatFields_1.default)(filteredFields, {
            labelFormat: label => `    ${chalk_1.default.dim(label)}:`,
        }));
}
