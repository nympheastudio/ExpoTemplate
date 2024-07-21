export declare function waitAsync(duration: number): Promise<void>;
type WithRetryOptions = {
    tries?: number;
    delay?: number;
    onRetry?: (triesLeft: number) => void;
};
export declare function retryIfNullAsync<T>(method: () => Promise<T | null>, options?: WithRetryOptions): Promise<T | null>;
export {};
