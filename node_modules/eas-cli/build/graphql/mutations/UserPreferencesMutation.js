"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPreferencesMutation = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../client");
exports.UserPreferencesMutation = {
    async markCliDoneInOnboardingUserPreferencesAsync(graphqlClient, userPreferencesData) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation MarkCliDoneInOnboardingUserPreferencesMutation(
              $preferences: UserPreferencesInput!
            ) {
              me {
                setPreferences(preferences: $preferences) {
                  onboarding {
                    appId
                    isCLIDone
                  }
                }
              }
            }
          `, {
            preferences: {
                onboarding: {
                    ...userPreferencesData,
                    isCLIDone: true,
                    lastUsed: new Date().toISOString(),
                },
            },
        })
            .toPromise());
        const appId = data.me.setPreferences.onboarding?.appId;
        (0, assert_1.default)(appId, 'App ID must be defined');
        const isCLIDone = data.me.setPreferences.onboarding?.isCLIDone;
        (0, assert_1.default)(isCLIDone, 'isCLIDone must be defined and true');
        return {
            appId,
            isCLIDone,
        };
    },
};
