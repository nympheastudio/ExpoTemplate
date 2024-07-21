import { CombinedError as GraphqlError, OperationResult } from '@urql/core';
export declare function withErrorHandlingAsync<T>(promise: Promise<OperationResult<T>>): Promise<T>;
export { GraphqlError };
