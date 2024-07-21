import { logger } from '@sentry/utils';
import { NativeEventEmitter } from 'react-native';
import { getRNSentryModule } from '../wrapper';
export const NewFrameEventName = 'rn_sentry_new_frame';
/**
 * Creates emitter that allows to listen to native RNSentry events
 */
export function createSentryEventEmitter(sentryNativeModule = getRNSentryModule(), createNativeEventEmitter = nativeModule => new NativeEventEmitter(nativeModule)) {
    if (!sentryNativeModule) {
        return createNoopSentryEventEmitter();
    }
    const openNativeListeners = new Map();
    const listenersMap = new Map();
    const nativeEventEmitter = createNativeEventEmitter(getRNSentryModule());
    const addListener = function (eventType, listener) {
        var _a;
        const map = listenersMap.get(eventType);
        if (!map) {
            logger.warn(`EventEmitter was not initialized for event type: ${eventType}`);
            return;
        }
        (_a = listenersMap.get(eventType)) === null || _a === void 0 ? void 0 : _a.set(listener, true);
    };
    const removeListener = function (eventType, listener) {
        var _a;
        (_a = listenersMap.get(eventType)) === null || _a === void 0 ? void 0 : _a.delete(listener);
    };
    return {
        initAsync(eventType) {
            if (openNativeListeners.has(eventType)) {
                return;
            }
            const nativeListener = nativeEventEmitter.addListener(eventType, (event) => {
                const listeners = listenersMap.get(eventType);
                if (!listeners) {
                    return;
                }
                listeners.forEach((_, listener) => {
                    listener(event);
                });
            });
            openNativeListeners.set(eventType, nativeListener);
            listenersMap.set(eventType, new Map());
        },
        closeAllAsync() {
            openNativeListeners.forEach(subscription => {
                subscription.remove();
            });
            openNativeListeners.clear();
            listenersMap.clear();
        },
        addListener,
        removeListener,
        once(eventType, listener) {
            const tmpListener = (event) => {
                listener(event);
                removeListener(eventType, tmpListener);
            };
            addListener(eventType, tmpListener);
        },
    };
}
function createNoopSentryEventEmitter() {
    return {
        initAsync: () => {
            logger.warn('Noop SentryEventEmitter: initAsync');
        },
        closeAllAsync: () => {
            logger.warn('Noop SentryEventEmitter: closeAllAsync');
        },
        addListener: () => {
            logger.warn('Noop SentryEventEmitter: addListener');
        },
        removeListener: () => {
            logger.warn('Noop SentryEventEmitter: removeListener');
        },
        once: () => {
            logger.warn('Noop SentryEventEmitter: once');
        },
    };
}
//# sourceMappingURL=sentryeventemitter.js.map