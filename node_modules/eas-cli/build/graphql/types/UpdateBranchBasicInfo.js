"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBranchBasicInfoFragmentNode = void 0;
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.UpdateBranchBasicInfoFragmentNode = (0, graphql_tag_1.default) `
  fragment UpdateBranchBasicInfoFragment on UpdateBranch {
    id
    name
  }
`;
