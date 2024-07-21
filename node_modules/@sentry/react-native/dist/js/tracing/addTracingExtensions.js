import { addTracingExtensions, getCurrentHub, getMainCarrier } from '@sentry/core';
import { DEFAULT } from '../tracing/ops';
import { ReactNativeTracing } from '../tracing/reactnativetracing';
/**
 * Adds React Native's extensions. Needs to be called before any transactions are created.
 */
export function _addTracingExtensions() {
    addTracingExtensions();
    const carrier = getMainCarrier();
    if (carrier.__SENTRY__) {
        carrier.__SENTRY__.extensions = carrier.__SENTRY__.extensions || {};
        if (carrier.__SENTRY__.extensions.startTransaction) {
            const originalStartTransaction = carrier.__SENTRY__.extensions.startTransaction;
            /*
              Overwrites the transaction start and finish to start and finish stall tracking.
              Preferably instead of overwriting add a callback method for this in the Transaction itself.
            */
            const _startTransaction = _patchStartTransaction(originalStartTransaction);
            carrier.__SENTRY__.extensions.startTransaction = _startTransaction;
        }
    }
}
/**
 * Overwrite the startTransaction extension method to start and end stall tracking.
 */
const _patchStartTransaction = (originalStartTransaction) => {
    /**
     * Method to overwrite with
     */
    function _startTransaction(transactionContext, customSamplingContext) {
        // Native SDKs require op to be set - for JS Relay sets `default`
        if (!transactionContext.op) {
            transactionContext.op = DEFAULT;
        }
        const transaction = originalStartTransaction.apply(this, [transactionContext, customSamplingContext]);
        const originalStartChild = transaction.startChild.bind(transaction);
        transaction.startChild = (spanContext) => {
            return originalStartChild(Object.assign(Object.assign({}, spanContext), { 
                // Native SDKs require op to be set
                op: (spanContext === null || spanContext === void 0 ? void 0 : spanContext.op) || DEFAULT }));
        };
        const reactNativeTracing = getCurrentHub().getIntegration(ReactNativeTracing);
        if (reactNativeTracing) {
            reactNativeTracing.onTransactionStart(transaction);
            // eslint-disable-next-line @typescript-eslint/unbound-method
            const originalFinish = transaction.finish;
            transaction.finish = (endTimestamp) => {
                if (reactNativeTracing) {
                    reactNativeTracing.onTransactionFinish(transaction, endTimestamp);
                }
                return originalFinish.apply(transaction, [endTimestamp]);
            };
            // eslint-disable-next-line @typescript-eslint/unbound-method
            const originalEnd = transaction.end;
            transaction.end = (endTimestamp) => {
                if (reactNativeTracing) {
                    reactNativeTracing.onTransactionFinish(transaction, endTimestamp);
                }
                return originalEnd.apply(transaction, [endTimestamp]);
            };
        }
        return transaction;
    }
    return _startTransaction;
};
//# sourceMappingURL=addTracingExtensions.js.map