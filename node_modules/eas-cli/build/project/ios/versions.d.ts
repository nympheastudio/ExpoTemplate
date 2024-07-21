export declare const BUILD_NUMBER_REQUIREMENTS = "buildNumber needs to consist only of up to 3 dot-separated positive integers";
export declare function isValidBuildNumber(buildNumber: string): boolean;
export declare function getNextBuildNumber(buildNumber: string): string;
