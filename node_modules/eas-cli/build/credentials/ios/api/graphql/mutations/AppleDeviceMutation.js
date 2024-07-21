"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleDeviceMutation = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const AppleDevice_1 = require("../../../../../graphql/types/credentials/AppleDevice");
exports.AppleDeviceMutation = {
    async createAppleDeviceAsync(graphqlClient, appleDeviceInput, accountId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateAppleDeviceMutation(
              $appleDeviceInput: AppleDeviceInput!
              $accountId: ID!
            ) {
              appleDevice {
                createAppleDevice(appleDeviceInput: $appleDeviceInput, accountId: $accountId) {
                  id
                  ...AppleDeviceFragment
                }
              }
            }
            ${(0, graphql_1.print)(AppleDevice_1.AppleDeviceFragmentNode)}
          `, {
            appleDeviceInput,
            accountId,
        })
            .toPromise());
        return data.appleDevice.createAppleDevice;
    },
    async deleteAppleDeviceAsync(graphqlClient, deviceId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation DeleteAppleDeviceMutation($deviceId: ID!) {
              appleDevice {
                deleteAppleDevice(id: $deviceId) {
                  id
                }
              }
            }
          `, {
            deviceId,
        })
            .toPromise());
        return data.id;
    },
    async updateAppleDeviceAsync(graphqlClient, id, appleDeviceUpdateInput) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation UpdateAppleDeviceMutation(
              $id: ID!
              $appleDeviceUpdateInput: AppleDeviceUpdateInput!
            ) {
              appleDevice {
                updateAppleDevice(id: $id, appleDeviceUpdateInput: $appleDeviceUpdateInput) {
                  id
                  ...AppleDeviceFragment
                }
              }
            }
            ${(0, graphql_1.print)(AppleDevice_1.AppleDeviceFragmentNode)}
          `, {
            id,
            appleDeviceUpdateInput,
        })
            .toPromise());
        return data.appleDevice.updateAppleDevice;
    },
};
