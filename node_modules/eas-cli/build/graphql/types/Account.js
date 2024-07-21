"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountFragmentNode = void 0;
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.AccountFragmentNode = (0, graphql_tag_1.default) `
  fragment AccountFragment on Account {
    id
    name
    ownerUserActor {
      id
      username
    }
    users {
      actor {
        id
      }
      role
    }
  }
`;
