"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentSecretTypeToSecretType = exports.SecretTypeToEnvironmentSecretType = exports.SecretType = exports.EnvironmentSecretFragmentNode = void 0;
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const generated_1 = require("../generated");
exports.EnvironmentSecretFragmentNode = (0, graphql_tag_1.default) `
  fragment EnvironmentSecretFragment on EnvironmentSecret {
    id
    name
    type
    createdAt
  }
`;
var SecretType;
(function (SecretType) {
    SecretType["STRING"] = "string";
    SecretType["FILE"] = "file";
})(SecretType || (exports.SecretType = SecretType = {}));
exports.SecretTypeToEnvironmentSecretType = {
    [SecretType.STRING]: generated_1.EnvironmentSecretType.String,
    [SecretType.FILE]: generated_1.EnvironmentSecretType.FileBase64,
};
exports.EnvironmentSecretTypeToSecretType = {
    [generated_1.EnvironmentSecretType.String]: SecretType.STRING,
    [generated_1.EnvironmentSecretType.FileBase64]: SecretType.FILE,
};
