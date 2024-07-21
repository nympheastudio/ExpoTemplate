"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IosAppBuildCredentialsFragmentNode = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const AppleDistributionCertificate_1 = require("./AppleDistributionCertificate");
const AppleProvisioningProfile_1 = require("./AppleProvisioningProfile");
exports.IosAppBuildCredentialsFragmentNode = (0, graphql_tag_1.default) `
  fragment IosAppBuildCredentialsFragment on IosAppBuildCredentials {
    id
    iosDistributionType
    distributionCertificate {
      id
      ...AppleDistributionCertificateFragment
    }
    provisioningProfile {
      id
      ...AppleProvisioningProfileFragment
    }
  }
  ${(0, graphql_1.print)(AppleDistributionCertificate_1.AppleDistributionCertificateFragmentNode)}
  ${(0, graphql_1.print)(AppleProvisioningProfile_1.AppleProvisioningProfileFragmentNode)}
`;
