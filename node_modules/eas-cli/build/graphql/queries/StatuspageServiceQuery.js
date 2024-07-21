"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatuspageServiceQuery = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../client");
const StatuspageService_1 = require("../types/StatuspageService");
exports.StatuspageServiceQuery = {
    async statuspageServicesAsync(graphqlClient, serviceNames) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query StatuspageServiceByServiceNamesQuery($serviceNames: [StatuspageServiceName!]!) {
              statuspageService {
                byServiceNames(serviceNames: $serviceNames) {
                  id
                  ...StatuspageServiceFragment
                }
              }
            }
            ${(0, graphql_1.print)(StatuspageService_1.StatuspageServiceFragmentNode)}
          `, { serviceNames }, {
            additionalTypenames: ['StatuspageService', 'StatuspageIncident'],
        })
            .toPromise());
        return data.statuspageService.byServiceNames;
    },
};
