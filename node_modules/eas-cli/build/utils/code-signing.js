"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDirectiveBodyAgainstUpdateInfoGroup = exports.checkManifestBodyAgainstUpdateInfoGroup = exports.signBody = exports.getDirectiveBodyAsync = exports.getManifestBodyAsync = exports.getKeyAndCertificateFromPathsAsync = exports.getCodeSigningInfoAsync = void 0;
const tslib_1 = require("tslib");
const code_signing_certificates_1 = require("@expo/code-signing-certificates");
const multipart_body_parser_1 = require("@expo/multipart-body-parser");
const fast_deep_equal_1 = tslib_1.__importDefault(require("fast-deep-equal"));
const fs_1 = require("fs");
const nullthrows_1 = tslib_1.__importDefault(require("nullthrows"));
const areSetsEqual_1 = tslib_1.__importDefault(require("./expodash/areSetsEqual"));
async function getCodeSigningInfoAsync(config, privateKeyPath) {
    const codeSigningCertificatePath = config.updates?.codeSigningCertificate;
    if (!codeSigningCertificatePath) {
        return undefined;
    }
    if (!privateKeyPath) {
        throw new Error('Must specify --private-key-path argument to sign update for code signing');
    }
    const codeSigningMetadata = config.updates?.codeSigningMetadata;
    if (!codeSigningMetadata) {
        throw new Error('Must specify codeSigningMetadata under the "updates" field of your app config file to use EAS code signing');
    }
    const { alg, keyid } = codeSigningMetadata;
    if (!alg || !keyid) {
        throw new Error('Must specify keyid and alg in the codeSigningMetadata field under the "updates" field of your app config file to use EAS code signing');
    }
    return {
        ...(await getKeyAndCertificateFromPathsAsync({
            codeSigningCertificatePath,
            privateKeyPath,
        })),
        codeSigningMetadata: {
            alg,
            keyid,
        },
    };
}
exports.getCodeSigningInfoAsync = getCodeSigningInfoAsync;
async function readFileAsync(path, errorMessage) {
    try {
        return await fs_1.promises.readFile(path, 'utf8');
    }
    catch {
        throw new Error(errorMessage);
    }
}
async function getKeyAndCertificateFromPathsAsync({ codeSigningCertificatePath, privateKeyPath, }) {
    const [codeSigningCertificatePEM, privateKeyPEM] = await Promise.all([
        readFileAsync(codeSigningCertificatePath, `Code signing certificate cannot be read from path: ${codeSigningCertificatePath}`),
        readFileAsync(privateKeyPath, `Code signing private key cannot be read from path: ${privateKeyPath}`),
    ]);
    const privateKey = (0, code_signing_certificates_1.convertPrivateKeyPEMToPrivateKey)(privateKeyPEM);
    const certificate = (0, code_signing_certificates_1.convertCertificatePEMToCertificate)(codeSigningCertificatePEM);
    (0, code_signing_certificates_1.validateSelfSignedCertificate)(certificate, {
        publicKey: certificate.publicKey,
        privateKey,
    });
    return {
        privateKey,
        certificate,
    };
}
exports.getKeyAndCertificateFromPathsAsync = getKeyAndCertificateFromPathsAsync;
async function getMultipartBodyPartAsync(res, partName) {
    const contentType = res.headers.get('content-type');
    if (!contentType) {
        throw new Error('The multipart manifest response is missing the content-type header');
    }
    const bodyBuffer = await res.arrayBuffer();
    const multipartParts = await (0, multipart_body_parser_1.parseMultipartMixedResponseAsync)(contentType, Buffer.from(bodyBuffer));
    const manifestPart = multipartParts.find(part => (0, multipart_body_parser_1.isMultipartPartWithName)(part, partName));
    return manifestPart?.body ?? null;
}
async function getManifestBodyAsync(res) {
    return await getMultipartBodyPartAsync(res, 'manifest');
}
exports.getManifestBodyAsync = getManifestBodyAsync;
async function getDirectiveBodyAsync(res) {
    return await getMultipartBodyPartAsync(res, 'directive');
}
exports.getDirectiveBodyAsync = getDirectiveBodyAsync;
function signBody(body, codeSigningInfo) {
    return (0, code_signing_certificates_1.signBufferRSASHA256AndVerify)(codeSigningInfo.privateKey, codeSigningInfo.certificate, Buffer.from(body, 'utf-8'));
}
exports.signBody = signBody;
function assertAssetParity(manifestResponseBodyAssetJSON, partialManifestAsset) {
    const baseErrorMessage = `Code signing manifest integrity error: Manifest asset tamper detected for asset: ${partialManifestAsset.bundleKey}; field: `;
    if (manifestResponseBodyAssetJSON.hash !== partialManifestAsset.fileSHA256) {
        throw new Error(baseErrorMessage + 'hash');
    }
    if (manifestResponseBodyAssetJSON.contentType !== partialManifestAsset.contentType) {
        throw new Error(baseErrorMessage + 'contentType');
    }
    if (manifestResponseBodyAssetJSON.key !== partialManifestAsset.bundleKey) {
        throw new Error(baseErrorMessage + 'key');
    }
}
function checkManifestBodyAgainstUpdateInfoGroup(manifestResponseBody, partialManifest) {
    const manifestResponseBodyJSON = JSON.parse(manifestResponseBody);
    // Assert expoClient config is equal. We do not want to sign the manifest if the
    // server has compromised the integrity of the manifest.
    // JSON stringify and unstringify to remove any undefined values and bring it as close
    // to the server sanitized value as possible
    const isExtraEqual = (0, fast_deep_equal_1.default)(JSON.parse(JSON.stringify(partialManifest.extra?.expoClient)), manifestResponseBodyJSON.extra?.expoClient);
    if (!isExtraEqual) {
        throw new Error(`Code signing manifest integrity error: The manifest being signed contains an extra.expoClient field that does not match the initially uploaded manifest's extra.expoClient field`);
    }
    assertAssetParity(manifestResponseBodyJSON.launchAsset, partialManifest.launchAsset);
    if (manifestResponseBodyJSON.assets.length !== partialManifest.assets.length) {
        throw new Error('Code signing manifest integrity error: The manifest being signed has an assets array of differing length from the initially uploaded manifest');
    }
    for (const partialManifestAsset of partialManifest.assets) {
        const partialManifestAssetBundleKey = (0, nullthrows_1.default)(partialManifestAsset).bundleKey;
        const correspondingManifestResponseBodyAssetJSON = manifestResponseBodyJSON.assets.find((manifestResponseBodyAssetJSON) => manifestResponseBodyAssetJSON.key === partialManifestAssetBundleKey);
        if (!correspondingManifestResponseBodyAssetJSON) {
            throw new Error(`Code signing manifest integrity error: The manifest being signed has is missing an asset specified in the initially uploaded manifest: ${partialManifestAssetBundleKey}`);
        }
        assertAssetParity(correspondingManifestResponseBodyAssetJSON, (0, nullthrows_1.default)(partialManifestAsset));
    }
}
exports.checkManifestBodyAgainstUpdateInfoGroup = checkManifestBodyAgainstUpdateInfoGroup;
function checkDirectiveBodyAgainstUpdateInfoGroup(directiveResponseBody) {
    const directiveResponseBodyJSON = JSON.parse(directiveResponseBody);
    if (!(0, areSetsEqual_1.default)(new Set(Object.keys(directiveResponseBodyJSON)), new Set(['extra', 'type', 'parameters']))) {
        throw new Error('Code signing directive integrity error: Unexpected keys');
    }
    if (directiveResponseBodyJSON.type !== 'rollBackToEmbedded') {
        throw new Error('Code signing directive integrity error: Incorrect directive type');
    }
}
exports.checkDirectiveBodyAgainstUpdateInfoGroup = checkDirectiveBodyAgainstUpdateInfoGroup;
