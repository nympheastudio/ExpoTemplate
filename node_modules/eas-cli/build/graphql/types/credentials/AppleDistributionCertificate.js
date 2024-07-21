"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleDistributionCertificateFragmentNode = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const AppleAppIdentifier_1 = require("./AppleAppIdentifier");
const AppleProvisioningProfile_1 = require("./AppleProvisioningProfile");
const AppleTeam_1 = require("./AppleTeam");
const App_1 = require("../App");
exports.AppleDistributionCertificateFragmentNode = (0, graphql_tag_1.default) `
  fragment AppleDistributionCertificateFragment on AppleDistributionCertificate {
    id
    certificateP12
    certificatePassword
    serialNumber
    developerPortalIdentifier
    validityNotBefore
    validityNotAfter
    updatedAt
    appleTeam {
      id
      ...AppleTeamFragment
    }
    iosAppBuildCredentialsList {
      id
      iosAppCredentials {
        id
        app {
          id
          ...AppFragment
        }
        appleAppIdentifier {
          id
          ...AppleAppIdentifierFragment
        }
      }
      provisioningProfile {
        id
        ...AppleProvisioningProfileIdentifiersFragment
      }
    }
  }
  ${(0, graphql_1.print)(AppleTeam_1.AppleTeamFragmentNode)}
  ${(0, graphql_1.print)(App_1.AppFragmentNode)}
  ${(0, graphql_1.print)(AppleAppIdentifier_1.AppleAppIdentifierFragmentNode)}
  ${(0, graphql_1.print)(AppleProvisioningProfile_1.AppleProvisioningProfileIdentifiersFragmentNode)}
`;
