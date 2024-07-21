"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppFragmentNode = void 0;
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const Account_1 = require("./Account");
exports.AppFragmentNode = (0, graphql_tag_1.default) `
  fragment AppFragment on App {
    id
    name
    fullName
    slug
    ownerAccount {
      id
      name
      ...AccountFragment
    }
    githubRepository {
      id
      metadata {
        githubRepoOwnerName
        githubRepoName
      }
    }
  }
  ${Account_1.AccountFragmentNode}
`;
