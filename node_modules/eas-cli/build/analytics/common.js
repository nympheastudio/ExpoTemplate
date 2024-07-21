"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAnalyticsAsync = void 0;
async function withAnalyticsAsync(analytics, fn, { attemptEvent, successEvent, failureEvent, properties, }) {
    try {
        analytics.logEvent(attemptEvent, properties);
        const result = await fn();
        analytics.logEvent(successEvent, properties);
        return result;
    }
    catch (error) {
        analytics.logEvent(failureEvent, {
            ...properties,
            reason: error.message,
        });
        throw error;
    }
}
exports.withAnalyticsAsync = withAnalyticsAsync;
