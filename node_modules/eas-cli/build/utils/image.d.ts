export declare class ImageNonPngError extends Error {
}
export declare class ImageTransparencyError extends Error {
}
export declare function ensurePNGIsNotTransparentAsync(imagePathOrURL: string): Promise<void>;
export declare function isPNGAsync(imagePathOrURL: string): Promise<boolean>;
