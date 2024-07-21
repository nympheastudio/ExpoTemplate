/* eslint-disable max-lines */
import { getActiveSpan, setMeasurement, spanToJSON, startInactiveSpan } from '@sentry/core';
import { logger, timestampInSeconds } from '@sentry/utils';
import { createSentryEventEmitter, NewFrameEventName } from '../utils/sentryeventemitter';
import { RN_GLOBAL_OBJ } from '../utils/worldwide';
import { NATIVE } from '../wrapper';
import { InternalRoutingInstrumentation } from './routingInstrumentation';
import { manualInitialDisplaySpans, startTimeToInitialDisplaySpan } from './timetodisplay';
import { customTransactionSource, defaultTransactionSource, getBlankTransactionContext } from './utils';
const defaultOptions = {
    routeChangeTimeoutMs: 1000,
    enableTimeToInitialDisplay: false,
};
/**
 * Instrumentation for React-Navigation V5 and above. See docs or sample app for usage.
 *
 * How this works:
 * - `_onDispatch` is called every time a dispatch happens and sets an IdleTransaction on the scope without any route context.
 * - `_onStateChange` is then called AFTER the state change happens due to a dispatch and sets the route context onto the active transaction.
 * - If `_onStateChange` isn't called within `STATE_CHANGE_TIMEOUT_DURATION` of the dispatch, then the transaction is not sampled and finished.
 */
export class ReactNavigationInstrumentation extends InternalRoutingInstrumentation {
    constructor(options = {}) {
        super();
        this.name = ReactNavigationInstrumentation.instrumentationName;
        this._navigationContainer = null;
        this._newScreenFrameEventEmitter = null;
        this._maxRecentRouteLen = 200;
        this._initialStateHandled = false;
        this._recentRouteKeys = [];
        /** Pushes a recent route key, and removes earlier routes when there is greater than the max length */
        this._pushRecentRouteKey = (key) => {
            this._recentRouteKeys.push(key);
            if (this._recentRouteKeys.length > this._maxRecentRouteLen) {
                this._recentRouteKeys = this._recentRouteKeys.slice(this._recentRouteKeys.length - this._maxRecentRouteLen);
            }
        };
        this._options = Object.assign(Object.assign({}, defaultOptions), options);
        if (this._options.enableTimeToInitialDisplay) {
            this._newScreenFrameEventEmitter = createSentryEventEmitter();
            this._newScreenFrameEventEmitter.initAsync(NewFrameEventName);
            NATIVE.initNativeReactNavigationNewFrameTracking().catch((reason) => {
                logger.error(`[ReactNavigationInstrumentation] Failed to initialize native new frame tracking: ${reason}`);
            });
        }
    }
    /**
     * Extends by calling _handleInitialState at the end.
     */
    registerRoutingInstrumentation(listener, beforeNavigate, onConfirmRoute) {
        super.registerRoutingInstrumentation(listener, beforeNavigate, onConfirmRoute);
        // We create an initial state here to ensure a transaction gets created before the first route mounts.
        if (!this._initialStateHandled) {
            this._onDispatch();
            if (this._navigationContainer) {
                // Navigation container already registered, just populate with route state
                this._onStateChange();
                this._initialStateHandled = true;
            }
        }
    }
    /**
     * Pass the ref to the navigation container to register it to the instrumentation
     * @param navigationContainerRef Ref to a `NavigationContainer`
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    registerNavigationContainer(navigationContainerRef) {
        /* We prevent duplicate routing instrumentation to be initialized on fast refreshes
    
          Explanation: If the user triggers a fast refresh on the file that the instrumentation is
          initialized in, it will initialize a new instance and will cause undefined behavior.
         */
        if (!RN_GLOBAL_OBJ.__sentry_rn_v5_registered) {
            if ('current' in navigationContainerRef) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                this._navigationContainer = navigationContainerRef.current;
            }
            else {
                this._navigationContainer = navigationContainerRef;
            }
            if (this._navigationContainer) {
                this._navigationContainer.addListener('__unsafe_action__', // This action is emitted on every dispatch
                this._onDispatch.bind(this));
                this._navigationContainer.addListener('state', // This action is emitted on every state change
                this._onStateChange.bind(this));
                if (!this._initialStateHandled) {
                    if (this._latestTransaction) {
                        // If registerRoutingInstrumentation was called first _onDispatch has already been called
                        this._onStateChange();
                        this._initialStateHandled = true;
                    }
                    else {
                        logger.log('[ReactNavigationInstrumentation] Navigation container registered, but integration has not been setup yet.');
                    }
                }
                RN_GLOBAL_OBJ.__sentry_rn_v5_registered = true;
            }
            else {
                logger.warn('[ReactNavigationInstrumentation] Received invalid navigation container ref!');
            }
        }
        else {
            logger.log('[ReactNavigationInstrumentation] Instrumentation already exists, but register has been called again, doing nothing.');
        }
    }
    /**
     * To be called on every React-Navigation action dispatch.
     * It does not name the transaction or populate it with route information. Instead, it waits for the state to fully change
     * and gets the route information from there, @see _onStateChange
     */
    _onDispatch() {
        var _a;
        if (this._latestTransaction) {
            logger.log('[ReactNavigationInstrumentation] A transaction was detected that turned out to be a noop, discarding.');
            this._discardLatestTransaction();
            this._clearStateChangeTimeout();
        }
        this._latestTransaction = this.onRouteWillChange(getBlankTransactionContext(ReactNavigationInstrumentation.instrumentationName));
        if (this._options.enableTimeToInitialDisplay) {
            this._navigationProcessingSpan = startInactiveSpan({
                op: 'navigation.processing',
                name: 'Navigation processing',
                startTimestamp: (_a = this._latestTransaction) === null || _a === void 0 ? void 0 : _a.startTimestamp,
            });
        }
        this._stateChangeTimeout = setTimeout(this._discardLatestTransaction.bind(this), this._options.routeChangeTimeoutMs);
    }
    /**
     * To be called AFTER the state has been changed to populate the transaction with the current route.
     */
    _onStateChange() {
        var _a, _b, _c, _d, _e;
        const stateChangedTimestamp = timestampInSeconds();
        // Use the getCurrentRoute method to be accurate.
        const previousRoute = this._latestRoute;
        if (!this._navigationContainer) {
            logger.warn('[ReactNavigationInstrumentation] Missing navigation container ref. Route transactions will not be sent.');
            return;
        }
        const route = this._navigationContainer.getCurrentRoute();
        if (route) {
            if (this._latestTransaction) {
                if (!previousRoute || previousRoute.key !== route.key) {
                    const routeHasBeenSeen = this._recentRouteKeys.includes(route.key);
                    const latestTtidSpan = !routeHasBeenSeen &&
                        this._options.enableTimeToInitialDisplay &&
                        startTimeToInitialDisplaySpan({
                            name: `${route.name} initial display`,
                            isAutoInstrumented: true,
                        });
                    !routeHasBeenSeen &&
                        ((_a = this._newScreenFrameEventEmitter) === null || _a === void 0 ? void 0 : _a.once(NewFrameEventName, ({ newFrameTimestampInSeconds }) => {
                            var _a;
                            const activeSpan = getActiveSpan();
                            if (!activeSpan) {
                                logger.warn('[ReactNavigationInstrumentation] No active span found to attach ui.load.initial_display to.');
                                return;
                            }
                            if (manualInitialDisplaySpans.has(activeSpan)) {
                                logger.warn('[ReactNavigationInstrumentation] Detected manual instrumentation for the current active span.');
                                return;
                            }
                            if (!latestTtidSpan) {
                                return;
                            }
                            if (spanToJSON(latestTtidSpan).parent_span_id !== ((_a = getActiveSpan()) === null || _a === void 0 ? void 0 : _a.spanContext().spanId)) {
                                logger.warn('[ReactNavigationInstrumentation] Currently Active Span changed before the new frame was rendered, _latestTtidSpan is not a child of the currently active span.');
                                return;
                            }
                            latestTtidSpan.setStatus('ok');
                            latestTtidSpan.end(newFrameTimestampInSeconds);
                            const ttidSpan = spanToJSON(latestTtidSpan);
                            const ttidSpanEnd = ttidSpan.timestamp;
                            const ttidSpanStart = ttidSpan.start_timestamp;
                            if (!ttidSpanEnd || !ttidSpanStart) {
                                return;
                            }
                            setMeasurement('time_to_initial_display', (ttidSpanEnd - ttidSpanStart) * 1000, 'millisecond');
                        }));
                    (_b = this._navigationProcessingSpan) === null || _b === void 0 ? void 0 : _b.updateName(`Processing navigation to ${route.name}`);
                    (_c = this._navigationProcessingSpan) === null || _c === void 0 ? void 0 : _c.setStatus('ok');
                    (_d = this._navigationProcessingSpan) === null || _d === void 0 ? void 0 : _d.end(stateChangedTimestamp);
                    this._navigationProcessingSpan = undefined;
                    const originalContext = this._latestTransaction.toContext();
                    const data = Object.assign(Object.assign({}, originalContext.data), { route: {
                            name: route.name,
                            key: route.key,
                            // TODO: filter PII params instead of dropping them all
                            params: {},
                            hasBeenSeen: routeHasBeenSeen,
                        }, previousRoute: previousRoute
                            ? {
                                name: previousRoute.name,
                                key: previousRoute.key,
                                // TODO: filter PII params instead of dropping them all
                                params: {},
                            }
                            : null });
                    const updatedContext = Object.assign(Object.assign({}, originalContext), { name: route.name, tags: Object.assign(Object.assign({}, originalContext.tags), { 'routing.route.name': route.name }), data });
                    const finalContext = this._prepareFinalContext(updatedContext);
                    this._latestTransaction.updateWithContext(finalContext);
                    const isCustomName = updatedContext.name !== finalContext.name;
                    this._latestTransaction.setName(finalContext.name, isCustomName ? customTransactionSource : defaultTransactionSource);
                    (_e = this._onConfirmRoute) === null || _e === void 0 ? void 0 : _e.call(this, finalContext);
                }
                this._pushRecentRouteKey(route.key);
                this._latestRoute = route;
                // Clear the latest transaction as it has been handled.
                this._latestTransaction = undefined;
            }
        }
    }
    /** Creates final transaction context before confirmation */
    _prepareFinalContext(updatedContext) {
        var _a;
        let finalContext = (_a = this._beforeNavigate) === null || _a === void 0 ? void 0 : _a.call(this, Object.assign({}, updatedContext));
        // This block is to catch users not returning a transaction context
        if (!finalContext) {
            logger.error(`[ReactNavigationInstrumentation] beforeNavigate returned ${finalContext}, return context.sampled = false to not send transaction.`);
            finalContext = Object.assign(Object.assign({}, updatedContext), { sampled: false });
        }
        // Note: finalContext.sampled will be false at this point only if the user sets it to be so in beforeNavigate.
        if (finalContext.sampled === false) {
            logger.log(`[ReactNavigationInstrumentation] Will not send transaction "${finalContext.name}" due to beforeNavigate.`);
        }
        else {
            // Clear the timeout so the transaction does not get cancelled.
            this._clearStateChangeTimeout();
        }
        return finalContext;
    }
    /** Cancels the latest transaction so it does not get sent to Sentry. */
    _discardLatestTransaction() {
        if (this._latestTransaction) {
            this._latestTransaction.sampled = false;
            this._latestTransaction.finish();
            this._latestTransaction = undefined;
        }
        if (this._navigationProcessingSpan) {
            this._navigationProcessingSpan = undefined;
        }
    }
    /**
     *
     */
    _clearStateChangeTimeout() {
        if (typeof this._stateChangeTimeout !== 'undefined') {
            clearTimeout(this._stateChangeTimeout);
            this._stateChangeTimeout = undefined;
        }
    }
}
ReactNavigationInstrumentation.instrumentationName = 'react-navigation-v5';
/**
 * Backwards compatibility alias for ReactNavigationInstrumentation
 * @deprecated Use ReactNavigationInstrumentation
 */
export const ReactNavigationV5Instrumentation = ReactNavigationInstrumentation;
export const BLANK_TRANSACTION_CONTEXT = {
    name: 'Route Change',
    op: 'navigation',
    tags: {
        'routing.instrumentation': ReactNavigationInstrumentation.instrumentationName,
    },
    data: {},
};
//# sourceMappingURL=reactnavigation.js.map