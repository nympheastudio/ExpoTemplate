"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndroidKeystoreFragmentNode = void 0;
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.AndroidKeystoreFragmentNode = (0, graphql_tag_1.default) `
  fragment AndroidKeystoreFragment on AndroidKeystore {
    id
    type
    keystore
    keystorePassword
    keyAlias
    keyPassword
    md5CertificateFingerprint
    sha1CertificateFingerprint
    sha256CertificateFingerprint
    createdAt
    updatedAt
  }
`;
