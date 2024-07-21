"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppleTasks = void 0;
const age_rating_1 = require("./age-rating");
const app_info_1 = require("./app-info");
const app_review_detail_1 = require("./app-review-detail");
const app_version_1 = require("./app-version");
/**
 * List of all eligible tasks to sync local store configuration to the App store.
 */
function createAppleTasks({ version } = {}) {
    return [
        new app_version_1.AppVersionTask({ version }),
        new app_info_1.AppInfoTask(),
        new age_rating_1.AgeRatingTask(),
        new app_review_detail_1.AppReviewDetailTask(),
    ];
}
exports.createAppleTasks = createAppleTasks;
