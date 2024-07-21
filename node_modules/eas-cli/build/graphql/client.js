"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphqlError = exports.withErrorHandlingAsync = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@urql/core");
Object.defineProperty(exports, "GraphqlError", { enumerable: true, get: function () { return core_1.CombinedError; } });
const log_1 = tslib_1.__importDefault(require("../log"));
async function withErrorHandlingAsync(promise) {
    const { data, error } = await promise;
    if (error) {
        if (error.graphQLErrors.some(e => e?.extensions?.isTransient &&
            ![
                'EAS_BUILD_FREE_TIER_LIMIT_EXCEEDED',
                'EAS_BUILD_FREE_TIER_IOS_LIMIT_EXCEEDED',
            ].includes(e?.extensions?.errorCode))) {
            log_1.default.error(`We've encountered a transient error. Try again shortly.`);
        }
        throw error;
    }
    // Check for malformed response. This only checks the root query existence,
    // It doesn't affect returning responses with empty resultset.
    if (!data) {
        throw new Error('Returned query result data is null!');
    }
    return data;
}
exports.withErrorHandlingAsync = withErrorHandlingAsync;
