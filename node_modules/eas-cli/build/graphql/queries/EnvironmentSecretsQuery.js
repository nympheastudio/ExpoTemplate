"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentSecretsQuery = exports.EnvironmentSecretScope = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../client");
const EnvironmentSecret_1 = require("../types/EnvironmentSecret");
var EnvironmentSecretScope;
(function (EnvironmentSecretScope) {
    EnvironmentSecretScope["ACCOUNT"] = "account";
    EnvironmentSecretScope["PROJECT"] = "project";
})(EnvironmentSecretScope || (exports.EnvironmentSecretScope = EnvironmentSecretScope = {}));
exports.EnvironmentSecretsQuery = {
    async byAppIdAsync(graphqlClient, appId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query EnvironmentSecretsByAppId($appId: String!) {
              app {
                byId(appId: $appId) {
                  id
                  ownerAccount {
                    id
                    environmentSecrets {
                      id
                      ...EnvironmentSecretFragment
                    }
                  }
                  environmentSecrets {
                    id
                    ...EnvironmentSecretFragment
                  }
                }
              }
            }
            ${(0, graphql_1.print)(EnvironmentSecret_1.EnvironmentSecretFragmentNode)}
          `, { appId }, { additionalTypenames: ['EnvironmentSecret'] })
            .toPromise());
        return {
            accountSecrets: data.app?.byId.ownerAccount.environmentSecrets ?? [],
            appSecrets: data.app?.byId.environmentSecrets ?? [],
        };
    },
    async allAsync(graphqlClient, projectId) {
        const { accountSecrets, appSecrets } = await this.byAppIdAsync(graphqlClient, projectId);
        return [
            ...appSecrets.map(s => ({ ...s, scope: EnvironmentSecretScope.PROJECT })),
            ...accountSecrets.map(s => ({ ...s, scope: EnvironmentSecretScope.ACCOUNT })),
        ];
    },
};
