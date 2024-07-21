"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDistributionCertificateAsync = void 0;
const CredentialsUtils_1 = require("../appstore/CredentialsUtils");
async function validateDistributionCertificateAsync(ctx, distributionCertificate) {
    const certInfoFromApple = await ctx.appStore.listDistributionCertificatesAsync();
    const validDistributionCerts = (0, CredentialsUtils_1.filterRevokedDistributionCerts)([distributionCertificate], certInfoFromApple);
    return validDistributionCerts.length > 0;
}
exports.validateDistributionCertificateAsync = validateDistributionCertificateAsync;
