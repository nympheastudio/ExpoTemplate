"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGenericArtifact = exports.GenericArtifactType = exports.ManagedArtifactType = void 0;
var ManagedArtifactType;
(function (ManagedArtifactType) {
    ManagedArtifactType["APPLICATION_ARCHIVE"] = "APPLICATION_ARCHIVE";
    ManagedArtifactType["BUILD_ARTIFACTS"] = "BUILD_ARTIFACTS";
    /**
     * @deprecated
     */
    ManagedArtifactType["XCODE_BUILD_LOGS"] = "XCODE_BUILD_LOGS";
})(ManagedArtifactType || (exports.ManagedArtifactType = ManagedArtifactType = {}));
var GenericArtifactType;
(function (GenericArtifactType) {
    GenericArtifactType["ANDROID_APK"] = "android-apk";
    GenericArtifactType["ANDROID_AAB"] = "android-aab";
    GenericArtifactType["IOS_SIMULATOR_APP"] = "ios-simulator-app";
    GenericArtifactType["IOS_IPA"] = "ios-ipa";
    GenericArtifactType["OTHER"] = "other";
})(GenericArtifactType || (exports.GenericArtifactType = GenericArtifactType = {}));
const isGenericArtifact = (artifactSpec) => {
    if (Object.values(GenericArtifactType).includes(artifactSpec.type)) {
        return true;
    }
    return false;
};
exports.isGenericArtifact = isGenericArtifact;
//# sourceMappingURL=artifacts.js.map