import { getCurrentHub } from '@sentry/core';
import { logger } from '@sentry/utils';
import { UI_ACTION } from './ops';
import { ReactNativeTracing } from './reactnativetracing';
export const DEFAULT_BREADCRUMB_CATEGORY = 'gesture';
export const DEFAULT_BREADCRUMB_TYPE = 'user';
export const GESTURE_POSTFIX_LENGTH = 'GestureHandler'.length;
export const ACTION_GESTURE_FALLBACK = 'gesture';
/**
 * Patches React Native Gesture Handler v2 Gesture to start a transaction on gesture begin with the appropriate label.
 * Example: ShoppingCartScreen.dismissGesture
 */
export function sentryTraceGesture(
/**
 * Label of the gesture to be used in transaction name.
 * Example: dismissGesture
 */
label, gesture, options = {}) {
    var _a;
    const gestureCandidate = gesture;
    if (!gestureCandidate) {
        logger.warn('[GestureTracing] Gesture can not be undefined');
        return gesture;
    }
    if (!gestureCandidate.handlers) {
        logger.warn('[GestureTracing] Can not wrap gesture without handlers. If you want to wrap a gesture composition wrap individual gestures.');
        return gesture;
    }
    if (!label) {
        logger.warn('[GestureTracing] Can not wrap gesture without name.');
        return gesture;
    }
    const hub = ((_a = options.getCurrentHub) === null || _a === void 0 ? void 0 : _a.call(options)) || getCurrentHub();
    const name = gestureCandidate.handlerName.length > GESTURE_POSTFIX_LENGTH
        ? gestureCandidate.handlerName
            .substring(0, gestureCandidate.handlerName.length - GESTURE_POSTFIX_LENGTH)
            .toLowerCase()
        : ACTION_GESTURE_FALLBACK;
    const originalOnBegin = gestureCandidate.handlers.onBegin;
    gesture.handlers.onBegin = (event) => {
        var _a, _b;
        (_b = (_a = hub
            .getClient()) === null || _a === void 0 ? void 0 : _a.getIntegration(ReactNativeTracing)) === null || _b === void 0 ? void 0 : _b.startUserInteractionTransaction({ elementId: label, op: `${UI_ACTION}.${name}` });
        addGestureBreadcrumb(`Gesture ${label} begin.`, { event, hub, name });
        if (originalOnBegin) {
            originalOnBegin(event);
        }
    };
    const originalOnEnd = gestureCandidate.handlers.onEnd;
    gesture.handlers.onEnd = (event) => {
        addGestureBreadcrumb(`Gesture ${label} end.`, { event, hub, name });
        if (originalOnEnd) {
            originalOnEnd(event);
        }
    };
    return gesture;
}
function addGestureBreadcrumb(message, options) {
    const { event, hub, name } = options;
    const crumb = {
        message,
        level: 'info',
        type: DEFAULT_BREADCRUMB_TYPE,
        category: DEFAULT_BREADCRUMB_CATEGORY,
    };
    if (event) {
        const data = {
            gesture: name,
        };
        for (const key of Object.keys(GestureEventKeys)) {
            const eventKey = GestureEventKeys[key];
            if (eventKey in event) {
                data[eventKey] = event[eventKey];
            }
        }
        crumb.data = data;
    }
    hub.addBreadcrumb(crumb);
    logger.log(`[GestureTracing] ${crumb.message}`);
}
/**
 * Selected keys from RNGH 2 Gesture Event API.
 * We only want to send relevant data to save on payload size.
 * @hidden
 */
const GestureEventKeys = {
    NUMBER_OF_POINTERS: 'numberOfPointers',
    NUMBER_OF_TOUCHES: 'numberOfTouches',
    FORCE: 'force',
    FORCE_CHANGE: 'forceChange',
    ROTATION: 'rotation',
    ROTATION_CHANGE: 'rotationChange',
    SCALE: 'scale',
    SCALE_CHANGE: 'scaleChange',
    DURATION: 'duration',
    VELOCITY: 'velocity',
    VELOCITY_X: 'velocityX',
    VELOCITY_Y: 'velocityY',
};
//# sourceMappingURL=gesturetracing.js.map