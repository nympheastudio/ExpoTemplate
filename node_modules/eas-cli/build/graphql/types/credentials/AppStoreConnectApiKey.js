"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppStoreConnectApiKeyFragmentNode = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const AppleTeam_1 = require("./AppleTeam");
exports.AppStoreConnectApiKeyFragmentNode = (0, graphql_tag_1.default) `
  fragment AppStoreConnectApiKeyFragment on AppStoreConnectApiKey {
    id
    appleTeam {
      id
      ...AppleTeamFragment
    }
    issuerIdentifier
    keyIdentifier
    name
    roles
    createdAt
    updatedAt
  }
  ${(0, graphql_1.print)(AppleTeam_1.AppleTeamFragmentNode)}
`;
