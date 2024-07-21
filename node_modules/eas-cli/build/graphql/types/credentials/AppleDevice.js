"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleDeviceFragmentNode = exports.APPLE_DEVICE_CLASS_LABELS = void 0;
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const generated_1 = require("../../generated");
exports.APPLE_DEVICE_CLASS_LABELS = {
    [generated_1.AppleDeviceClass.Ipad]: 'iPad',
    [generated_1.AppleDeviceClass.Iphone]: 'iPhone',
    [generated_1.AppleDeviceClass.Mac]: 'Mac',
    [generated_1.AppleDeviceClass.Unknown]: 'Unknown',
};
exports.AppleDeviceFragmentNode = (0, graphql_tag_1.default) `
  fragment AppleDeviceFragment on AppleDevice {
    id
    identifier
    name
    model
    deviceClass
    createdAt
  }
`;
