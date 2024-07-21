"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleServiceAccountKeyFragmentNode = void 0;
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.GoogleServiceAccountKeyFragmentNode = (0, graphql_tag_1.default) `
  fragment GoogleServiceAccountKeyFragment on GoogleServiceAccountKey {
    id
    projectIdentifier
    privateKeyIdentifier
    clientEmail
    clientIdentifier
    createdAt
    updatedAt
  }
`;
