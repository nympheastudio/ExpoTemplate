"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBranchFragmentNode = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const Update_1 = require("./Update");
const UpdateBranchBasicInfo_1 = require("./UpdateBranchBasicInfo");
exports.UpdateBranchFragmentNode = (0, graphql_tag_1.default) `
  fragment UpdateBranchFragment on UpdateBranch {
    id
    ...UpdateBranchBasicInfoFragment
    updates(offset: 0, limit: 10) {
      id
      ...UpdateFragment
    }
  }
  ${(0, graphql_1.print)(Update_1.UpdateFragmentNode)}
  ${(0, graphql_1.print)(UpdateBranchBasicInfo_1.UpdateBranchBasicInfoFragmentNode)}
`;
