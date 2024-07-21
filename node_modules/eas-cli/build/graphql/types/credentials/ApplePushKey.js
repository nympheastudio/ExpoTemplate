"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplePushKeyFragmentNode = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const AppleAppIdentifier_1 = require("./AppleAppIdentifier");
const AppleTeam_1 = require("./AppleTeam");
const App_1 = require("../App");
exports.ApplePushKeyFragmentNode = (0, graphql_tag_1.default) `
  fragment ApplePushKeyFragment on ApplePushKey {
    id
    keyIdentifier
    updatedAt
    appleTeam {
      id
      ...AppleTeamFragment
    }
    iosAppCredentialsList {
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
  }
  ${(0, graphql_1.print)(AppleTeam_1.AppleTeamFragmentNode)}
  ${(0, graphql_1.print)(App_1.AppFragmentNode)}
  ${(0, graphql_1.print)(AppleAppIdentifier_1.AppleAppIdentifierFragmentNode)}
`;
