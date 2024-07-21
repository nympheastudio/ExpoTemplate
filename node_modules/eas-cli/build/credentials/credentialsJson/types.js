"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsJsonSchema = void 0;
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const CredentialsJsonIosTargetCredentialsSchema = joi_1.default.object({
    provisioningProfilePath: joi_1.default.string().required(),
    distributionCertificate: joi_1.default.object({
        path: joi_1.default.string().required(),
        password: joi_1.default.string().allow('').required(),
    }).required(),
});
exports.CredentialsJsonSchema = joi_1.default.object({
    android: joi_1.default.object({
        keystore: joi_1.default.object({
            keystorePath: joi_1.default.string().required(),
            keystorePassword: joi_1.default.string().allow('').required(),
            keyAlias: joi_1.default.string().required(),
            keyPassword: joi_1.default.string().allow(''),
        }).required(),
    }),
    ios: [
        CredentialsJsonIosTargetCredentialsSchema,
        joi_1.default.object().pattern(joi_1.default.string().required(), CredentialsJsonIosTargetCredentialsSchema.required()),
    ],
});
