"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonIosAppCredentialsFragmentNode = exports.CommonIosAppCredentialsWithoutBuildCredentialsFragmentNode = void 0;
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const AppStoreConnectApiKey_1 = require("./AppStoreConnectApiKey");
const AppleAppIdentifier_1 = require("./AppleAppIdentifier");
const ApplePushKey_1 = require("./ApplePushKey");
const AppleTeam_1 = require("./AppleTeam");
const IosAppBuildCredentials_1 = require("./IosAppBuildCredentials");
const App_1 = require("../App");
exports.CommonIosAppCredentialsWithoutBuildCredentialsFragmentNode = (0, graphql_tag_1.default) `
  fragment CommonIosAppCredentialsWithoutBuildCredentialsFragment on IosAppCredentials {
    id
    app {
      id
      ...AppFragment
    }
    appleTeam {
      id
      ...AppleTeamFragment
    }
    appleAppIdentifier {
      id
      ...AppleAppIdentifierFragment
    }
    pushKey {
      id
      ...ApplePushKeyFragment
    }
    appStoreConnectApiKeyForSubmissions {
      id
      ...AppStoreConnectApiKeyFragment
    }
  }
  ${App_1.AppFragmentNode}
  ${AppleTeam_1.AppleTeamFragmentNode}
  ${AppleAppIdentifier_1.AppleAppIdentifierFragmentNode}
  ${ApplePushKey_1.ApplePushKeyFragmentNode}
  ${AppStoreConnectApiKey_1.AppStoreConnectApiKeyFragmentNode}
`;
exports.CommonIosAppCredentialsFragmentNode = (0, graphql_tag_1.default) `
  fragment CommonIosAppCredentialsFragment on IosAppCredentials {
    id
    ...CommonIosAppCredentialsWithoutBuildCredentialsFragment
    iosAppBuildCredentialsList {
      id
      ...IosAppBuildCredentialsFragment
    }
  }
  ${exports.CommonIosAppCredentialsWithoutBuildCredentialsFragmentNode}
  ${IosAppBuildCredentials_1.IosAppBuildCredentialsFragmentNode}
`;
