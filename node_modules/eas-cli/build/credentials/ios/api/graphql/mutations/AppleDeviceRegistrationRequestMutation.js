"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleDeviceRegistrationRequestMutation = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const AppleDeviceRegistrationRequest_1 = require("../../../../../graphql/types/credentials/AppleDeviceRegistrationRequest");
exports.AppleDeviceRegistrationRequestMutation = {
    async createAppleDeviceRegistrationRequestAsync(graphqlClient, appleTeamId, accountId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateAppleDeviceRegistrationRequestMutation(
              $appleTeamId: ID!
              $accountId: ID!
            ) {
              appleDeviceRegistrationRequest {
                createAppleDeviceRegistrationRequest(
                  appleTeamId: $appleTeamId
                  accountId: $accountId
                ) {
                  id
                  ...AppleDeviceRegistrationRequestFragment
                }
              }
            }
            ${(0, graphql_1.print)(AppleDeviceRegistrationRequest_1.AppleDeviceRegistrationRequestFragmentNode)}
          `, {
            appleTeamId,
            accountId,
        })
            .toPromise());
        return data.appleDeviceRegistrationRequest.createAppleDeviceRegistrationRequest;
    },
};
