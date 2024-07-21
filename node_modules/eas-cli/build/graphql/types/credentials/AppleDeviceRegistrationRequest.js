"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleDeviceRegistrationRequestFragmentNode = void 0;
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.AppleDeviceRegistrationRequestFragmentNode = (0, graphql_tag_1.default) `
  fragment AppleDeviceRegistrationRequestFragment on AppleDeviceRegistrationRequest {
    id
  }
`;
