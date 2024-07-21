/**
 * asynchronous array filter
 * @param arr array to filter
 * @param predicate a predicate function to run asynchronously
 * @returns a promise resolving to a filtered array
 */
export declare const filterAsync: <T>(arr: T[], predicate: (value: T, index: number, array: T[]) => Promise<boolean>) => Promise<T[]>;
