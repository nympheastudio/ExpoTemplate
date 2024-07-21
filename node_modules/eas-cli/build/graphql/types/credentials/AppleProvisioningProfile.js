"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleProvisioningProfileIdentifiersFragmentNode = exports.AppleProvisioningProfileFragmentNode = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const AppleDevice_1 = require("./AppleDevice");
const AppleTeam_1 = require("./AppleTeam");
exports.AppleProvisioningProfileFragmentNode = (0, graphql_tag_1.default) `
  fragment AppleProvisioningProfileFragment on AppleProvisioningProfile {
    id
    expiration
    developerPortalIdentifier
    provisioningProfile
    updatedAt
    status
    appleTeam {
      id
      ...AppleTeamFragment
    }
    appleDevices {
      id
      ...AppleDeviceFragment
    }
  }
  ${(0, graphql_1.print)(AppleDevice_1.AppleDeviceFragmentNode)}
  ${(0, graphql_1.print)(AppleTeam_1.AppleTeamFragmentNode)}
`;
exports.AppleProvisioningProfileIdentifiersFragmentNode = (0, graphql_tag_1.default) `
  fragment AppleProvisioningProfileIdentifiersFragment on AppleProvisioningProfile {
    id
    developerPortalIdentifier
  }
`;
