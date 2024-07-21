"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeFragmentNode = void 0;
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.RuntimeFragmentNode = (0, graphql_tag_1.default) `
  fragment RuntimeFragment on Runtime {
    id
    version
  }
`;
