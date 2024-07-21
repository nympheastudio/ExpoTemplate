export declare enum ManagedArtifactType {
    APPLICATION_ARCHIVE = "APPLICATION_ARCHIVE",
    BUILD_ARTIFACTS = "BUILD_ARTIFACTS",
    /**
     * @deprecated
     */
    XCODE_BUILD_LOGS = "XCODE_BUILD_LOGS"
}
export declare enum GenericArtifactType {
    ANDROID_APK = "android-apk",
    ANDROID_AAB = "android-aab",
    IOS_SIMULATOR_APP = "ios-simulator-app",
    IOS_IPA = "ios-ipa",
    OTHER = "other"
}
export declare const isGenericArtifact: <TSpec extends {
    type: GenericArtifactType | ManagedArtifactType;
}>(artifactSpec: TSpec) => artifactSpec is TSpec & {
    type: GenericArtifactType;
};
