"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndroidAppBuildCredentialsFragmentNode = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const AndroidKeystore_1 = require("./AndroidKeystore");
exports.AndroidAppBuildCredentialsFragmentNode = (0, graphql_tag_1.default) `
  fragment AndroidAppBuildCredentialsFragment on AndroidAppBuildCredentials {
    id
    isDefault
    isLegacy
    name
    androidKeystore {
      id
      ...AndroidKeystoreFragment
    }
  }
  ${(0, graphql_1.print)(AndroidKeystore_1.AndroidKeystoreFragmentNode)}
`;
