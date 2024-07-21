"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonAndroidAppCredentialsFragmentNode = void 0;
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const AndroidAppBuildCredentials_1 = require("./AndroidAppBuildCredentials");
const AndroidFcm_1 = require("./AndroidFcm");
const GoogleServiceAccountKey_1 = require("./GoogleServiceAccountKey");
const App_1 = require("../App");
exports.CommonAndroidAppCredentialsFragmentNode = (0, graphql_tag_1.default) `
  fragment CommonAndroidAppCredentialsFragment on AndroidAppCredentials {
    id
    applicationIdentifier
    isLegacy
    app {
      id
      ...AppFragment
    }
    androidFcm {
      id
      ...AndroidFcmFragment
    }
    googleServiceAccountKeyForFcmV1 {
      id
      ...GoogleServiceAccountKeyFragment
    }
    googleServiceAccountKeyForSubmissions {
      id
      ...GoogleServiceAccountKeyFragment
    }
    androidAppBuildCredentialsList {
      id
      ...AndroidAppBuildCredentialsFragment
    }
  }
  ${App_1.AppFragmentNode}
  ${AndroidFcm_1.AndroidFcmFragmentNode}
  ${GoogleServiceAccountKey_1.GoogleServiceAccountKeyFragmentNode}
  ${AndroidAppBuildCredentials_1.AndroidAppBuildCredentialsFragmentNode}
`;
