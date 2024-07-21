"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatuspageServiceFragmentNode = void 0;
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.StatuspageServiceFragmentNode = (0, graphql_tag_1.default) `
  fragment StatuspageServiceFragment on StatuspageService {
    id
    name
    status
    incidents {
      id
      status
      name
      impact
      shortlink
    }
  }
`;
