"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndroidFcmFragmentNode = void 0;
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.AndroidFcmFragmentNode = (0, graphql_tag_1.default) `
  fragment AndroidFcmFragment on AndroidFcm {
    id
    snippet {
      ... on FcmSnippetLegacy {
        firstFourCharacters
        lastFourCharacters
      }
      ... on FcmSnippetV1 {
        projectId
        keyId
        serviceAccountEmail
        clientId
      }
    }
    credential
    version
    createdAt
    updatedAt
  }
`;
