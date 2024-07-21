"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserQuery = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../client");
const Account_1 = require("../types/Account");
exports.UserQuery = {
    async currentUserAsync(graphqlClient) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query CurrentUser {
              meActor {
                __typename
                id
                ... on UserActor {
                  username
                  primaryAccount {
                    id
                    ...AccountFragment
                  }
                  preferences {
                    onboarding {
                      appId
                      platform
                      deviceType
                      environment
                      isCLIDone
                      lastUsed
                    }
                  }
                }
                ... on Robot {
                  firstName
                }
                accounts {
                  id
                  ...AccountFragment
                }
                featureGates
                isExpoAdmin
              }
            }
            ${(0, graphql_1.print)(Account_1.AccountFragmentNode)}
          `, {}, {
            additionalTypenames: ['User', 'SSOUser'],
        })
            .toPromise());
        return data.meActor;
    },
};
