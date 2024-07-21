import { Options, Ora } from 'ora';
export { Ora, Options };
/**
 * A custom ora spinner that sends the stream to stdout in CI, or non-TTY, instead of stderr (the default).
 *
 * @param options
 * @returns
 */
export declare function ora(options?: Options | string): Ora;
