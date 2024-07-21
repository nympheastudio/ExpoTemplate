"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateKeystore = exports.getKeystoreType = exports.getKeystoreWithType = void 0;
const tslib_1 = require("tslib");
const pkcs12_1 = require("@expo/pkcs12");
const jks_js_1 = tslib_1.__importDefault(require("jks-js"));
const generated_1 = require("../../../graphql/generated");
const log_1 = tslib_1.__importDefault(require("../../../log"));
function getKeystoreWithType(keystore) {
    const type = getKeystoreType(keystore);
    return { ...keystore, type };
}
exports.getKeystoreWithType = getKeystoreWithType;
function getKeystoreType(keystore) {
    if (isPKCSKeystore(keystore)) {
        return generated_1.AndroidKeystoreType.Pkcs12;
    }
    else if (isJKSKeystore(keystore)) {
        return generated_1.AndroidKeystoreType.Jks;
    }
    return generated_1.AndroidKeystoreType.Unknown;
}
exports.getKeystoreType = getKeystoreType;
function isPKCSKeystore(keystore) {
    try {
        (0, pkcs12_1.parsePKCS12)(keystore.keystore, keystore.keystorePassword);
        return true;
    }
    catch {
        return false;
    }
}
function isJKSKeystore(keystore) {
    try {
        jks_js_1.default.parseJks(Buffer.from(keystore.keystore, 'base64'), keystore.keystorePassword);
        return true;
    }
    catch {
        return false;
    }
}
function validateKeystore(keystore) {
    if (keystore.type === generated_1.AndroidKeystoreType.Jks) {
        getPemFromJksKeystore(keystore);
    }
    else if (keystore.type === generated_1.AndroidKeystoreType.Pkcs12) {
        getX509Asn1FromPKCS12Keystore(keystore.keystore, keystore.keystorePassword, keystore.keyAlias);
    }
    else if (keystore.type === generated_1.AndroidKeystoreType.Unknown) {
        log_1.default.warn('Unknown keystore type, skipping validation.');
    }
    else {
        log_1.default.warn(`Unsupported keystore type: ${keystore.type}, skipping validation.`);
    }
}
exports.validateKeystore = validateKeystore;
function getPemFromJksKeystore(keystore) {
    const keystoreEntries = jks_js_1.default.parseJks(Buffer.from(keystore.keystore, 'base64'), keystore.keystorePassword);
    // keystore entries are case insensitive in both keytool and jks-js implementations
    const keystoreEntry = keystoreEntries.find((entry) => entry.alias.toLowerCase() === keystore.keyAlias.toLowerCase());
    if (!keystoreEntry) {
        throw new Error(`JKS Keystore does not contain alias: ${keystore.keyAlias}`);
    }
    const { protectedPrivateKey } = keystoreEntry;
    try {
        return jks_js_1.default.decrypt(protectedPrivateKey, keystore.keyPassword);
    }
    catch (e) {
        throw new Error(`${e.message}: Check that your key password is correct`);
    }
}
function getX509Asn1FromPKCS12Keystore(p12BufferOrBase64String, maybePassword, keyAlias) {
    let x509Asn1;
    try {
        const p12 = (0, pkcs12_1.parsePKCS12)(p12BufferOrBase64String, maybePassword);
        x509Asn1 = (0, pkcs12_1.getX509Asn1ByFriendlyName)(p12, keyAlias);
    }
    catch (e) {
        throw new Error(`Invalid PKCS#12 (.p12) keystore: ${e.message}`);
    }
    if (!x509Asn1) {
        throw new Error(`PKCS#12 keystore: Unable to get certificate under alias: ${keyAlias}. Run this to find the available aliases: keytool -list -v -keystore [your-keystore-path]`);
    }
    return x509Asn1;
}
