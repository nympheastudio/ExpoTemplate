"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeystoreGenerationUrlMutation = void 0;
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../client");
exports.KeystoreGenerationUrlMutation = {
    async createKeystoreGenerationUrlAsync(graphqlClient) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateKeystoreGenerationUrlMutation {
              keystoreGenerationUrl {
                createKeystoreGenerationUrl {
                  id
                  url
                }
              }
            }
          `, {})
            .toPromise());
        return data.keystoreGenerationUrl.createKeystoreGenerationUrl.url;
    },
};
