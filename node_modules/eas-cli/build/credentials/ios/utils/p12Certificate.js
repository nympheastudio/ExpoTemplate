"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCertData = exports.findP12CertSerialNumber = exports.getP12CertFingerprint = void 0;
const tslib_1 = require("tslib");
const node_forge_1 = tslib_1.__importDefault(require("node-forge"));
function getP12CertFingerprint(p12Buffer, passwordRaw) {
    const certData = getRawCertData(p12Buffer, passwordRaw);
    const certAsn1 = node_forge_1.default.pki.certificateToAsn1(certData);
    const certDer = node_forge_1.default.asn1.toDer(certAsn1).getBytes();
    return node_forge_1.default.md.sha1.create().update(certDer).digest().toHex().toUpperCase();
}
exports.getP12CertFingerprint = getP12CertFingerprint;
function findP12CertSerialNumber(p12Buffer, passwordRaw) {
    const { serialNumber } = getCertData(p12Buffer, passwordRaw);
    return serialNumber;
}
exports.findP12CertSerialNumber = findP12CertSerialNumber;
function getCertData(p12Buffer, passwordRaw) {
    const certData = getRawCertData(p12Buffer, passwordRaw);
    return {
        ...certData,
        serialNumber: certData.serialNumber.replace(/^0+/, '').toUpperCase(),
    };
}
exports.getCertData = getCertData;
function getRawCertData(p12Buffer, passwordRaw) {
    if (Buffer.isBuffer(p12Buffer)) {
        p12Buffer = p12Buffer.toString('base64');
    }
    else if (typeof p12Buffer !== 'string') {
        throw new Error('getCertData only takes strings and buffers.');
    }
    const password = String(passwordRaw || '');
    const p12Der = node_forge_1.default.util.decode64(p12Buffer);
    const p12Asn1 = node_forge_1.default.asn1.fromDer(p12Der);
    let p12;
    try {
        if (password) {
            p12 = node_forge_1.default.pkcs12.pkcs12FromAsn1(p12Asn1, password);
        }
        else {
            p12 = node_forge_1.default.pkcs12.pkcs12FromAsn1(p12Asn1);
        }
    }
    catch (_error) {
        const error = _error;
        if (/Invalid password/.exec(error.message)) {
            throw new Error('Could not parse distribution certificate. Check that your password is correct.');
        }
        else {
            throw error;
        }
    }
    const certBagType = node_forge_1.default.pki.oids.certBag;
    const certData = p12.getBags({ bagType: certBagType })?.[certBagType]?.[0]?.cert;
    if (!certData) {
        throw new Error("getRawCertData: couldn't find cert bag");
    }
    return certData;
}
