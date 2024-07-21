import type { NativeModule } from 'react-native';
import { NativeEventEmitter } from 'react-native';
export declare const NewFrameEventName = "rn_sentry_new_frame";
export type NewFrameEventName = typeof NewFrameEventName;
export type NewFrameEvent = {
    newFrameTimestampInSeconds: number;
};
export interface SentryEventEmitter {
    /**
     * Initializes the native event emitter
     * This method is synchronous in JS but the native event emitter starts asynchronously
     * https://github.com/facebook/react-native/blob/d09c02f9e2d468e4d0bde51890e312ae7003a3e6/packages/react-native/React/Modules/RCTEventEmitter.m#L95
     */
    initAsync: (eventType: NewFrameEventName) => void;
    closeAllAsync: () => void;
    addListener: (eventType: NewFrameEventName, listener: (event: NewFrameEvent) => void) => void;
    removeListener: (eventType: NewFrameEventName, listener: (event: NewFrameEvent) => void) => void;
    once: (eventType: NewFrameEventName, listener: (event: NewFrameEvent) => void) => void;
}
/**
 * Creates emitter that allows to listen to native RNSentry events
 */
export declare function createSentryEventEmitter(sentryNativeModule?: NativeModule | undefined, createNativeEventEmitter?: (nativeModule: NativeModule | undefined) => NativeEventEmitter): SentryEventEmitter;
//# sourceMappingURL=sentryeventemitter.d.ts.map