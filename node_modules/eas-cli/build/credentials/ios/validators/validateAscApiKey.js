"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidAndTrackedAscApiKeysAsync = exports.isAscApiKeyValidAndTrackedAsync = void 0;
async function isAscApiKeyValidAndTrackedAsync(ctx, ascApiKey) {
    const ascApiKeyInfo = await ctx.appStore.getAscApiKeyAsync(ascApiKey.keyId);
    return isKeyValid(ascApiKeyInfo);
}
exports.isAscApiKeyValidAndTrackedAsync = isAscApiKeyValidAndTrackedAsync;
async function getValidAndTrackedAscApiKeysAsync(ctx, ascApiKeys) {
    const ascApiKeysInfo = await ctx.appStore.listAscApiKeysAsync();
    const validAscApiKeysInfo = ascApiKeysInfo.filter(keyInfo => isKeyValid(keyInfo));
    const validKeyIdentifiers = new Set(validAscApiKeysInfo.map(keyInfo => keyInfo.keyId));
    return ascApiKeys.filter(key => validKeyIdentifiers.has(key.keyIdentifier));
}
exports.getValidAndTrackedAscApiKeysAsync = getValidAndTrackedAscApiKeysAsync;
function isKeyValid(ascApiKeyInfo) {
    if (!ascApiKeyInfo) {
        return false;
    }
    return !ascApiKeyInfo.isRevoked;
}
