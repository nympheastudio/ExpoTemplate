import { logger } from '@sentry/utils';
import { RN_GLOBAL_OBJ } from '../utils/worldwide';
import { InternalRoutingInstrumentation } from './routingInstrumentation';
import { customTransactionSource, defaultTransactionSource } from './utils';
const defaultOptions = {
    routeChangeTimeoutMs: 1000,
};
/**
 * Instrumentation for React-Navigation V4.
 * Register the app container with `registerAppContainer` to use, or see docs for more details.
 */
class ReactNavigationV4Instrumentation extends InternalRoutingInstrumentation {
    constructor(options = {}) {
        super();
        this.name = ReactNavigationV4Instrumentation.instrumentationName;
        this._appContainer = null;
        this._maxRecentRouteLen = 200;
        this._recentRouteKeys = [];
        this._initialStateHandled = false;
        /** Pushes a recent route key, and removes earlier routes when there is greater than the max length */
        this._pushRecentRouteKey = (key) => {
            this._recentRouteKeys.push(key);
            if (this._recentRouteKeys.length > this._maxRecentRouteLen) {
                this._recentRouteKeys = this._recentRouteKeys.slice(this._recentRouteKeys.length - this._maxRecentRouteLen);
            }
        };
        /** Helper to log a transaction that was not sampled due to beforeNavigate */
        this._onBeforeNavigateNotSampled = (transactionName) => {
            logger.log(`[ReactNavigationV4Instrumentation] Will not send transaction "${transactionName}" due to beforeNavigate.`);
        };
        this._options = Object.assign(Object.assign({}, defaultOptions), options);
    }
    /**
     * Extends by calling _handleInitialState at the end.
     */
    registerRoutingInstrumentation(listener, beforeNavigate, onConfirmRoute) {
        super.registerRoutingInstrumentation(listener, beforeNavigate, onConfirmRoute);
        // Need to handle the initial state as the router patch will only attach transactions on subsequent route changes.
        if (!this._initialStateHandled) {
            this._latestTransaction = this.onRouteWillChange(INITIAL_TRANSACTION_CONTEXT_V4);
            if (this._appContainer) {
                this._updateLatestTransaction();
                this._initialStateHandled = true;
            }
            else {
                this._stateChangeTimeout = setTimeout(this._discardLatestTransaction.bind(this), this._options.routeChangeTimeoutMs);
            }
        }
    }
    /**
     * Pass the ref to the app container to register it to the instrumentation
     * @param appContainerRef Ref to an `AppContainer`
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    registerAppContainer(appContainerRef) {
        /* We prevent duplicate routing instrumentation to be initialized on fast refreshes
    
          Explanation: If the user triggers a fast refresh on the file that the instrumentation is
          initialized in, it will initialize a new instance and will cause undefined behavior.
         */
        if (!RN_GLOBAL_OBJ.__sentry_rn_v4_registered) {
            if ('current' in appContainerRef) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                this._appContainer = appContainerRef.current;
            }
            else {
                this._appContainer = appContainerRef;
            }
            if (this._appContainer) {
                this._patchRouter();
                if (!this._initialStateHandled) {
                    if (this._latestTransaction) {
                        this._updateLatestTransaction();
                    }
                    else {
                        logger.log('[ReactNavigationV4Instrumentation] App container registered, but integration has not been setup yet.');
                    }
                    this._initialStateHandled = true;
                }
                RN_GLOBAL_OBJ.__sentry_rn_v4_registered = true;
            }
            else {
                logger.warn('[ReactNavigationV4Instrumentation] Received invalid app container ref!');
            }
        }
    }
    /**
     * Updates the latest transaction with the current state and calls beforeNavigate.
     */
    _updateLatestTransaction() {
        // We can assume the ref is present as this is called from registerAppContainer
        if (this._appContainer && this._latestTransaction) {
            const state = this._appContainer._navigation.state;
            if (typeof this._stateChangeTimeout !== 'undefined') {
                clearTimeout(this._stateChangeTimeout);
                this._stateChangeTimeout = undefined;
            }
            this._onStateChange(state, true);
        }
    }
    /**
     * Patches the react navigation router so we can listen to the route changes and attach the `IdleTransaction` before the
     * new screen is mounted.
     */
    _patchRouter() {
        if (this._appContainer) {
            const originalGetStateForAction = this._appContainer._navigation.router.getStateForAction;
            this._appContainer._navigation.router.getStateForAction = (action, state) => {
                const newState = originalGetStateForAction(action, state);
                this._onStateChange(newState);
                return newState;
            };
        }
    }
    /**
     * To be called on navigation state changes and creates the transaction.
     */
    _onStateChange(state, updateLatestTransaction = false) {
        var _a;
        // it's not guaranteed that a state is always produced.
        // see: https://github.com/react-navigation/react-navigation/blob/45d419be93c34e900e8734ce98321ae875ac4997/packages/core/src/routers/SwitchRouter.js?rgh-link-date=2021-09-25T12%3A43%3A36Z#L301
        if (!state || state === undefined) {
            logger.warn('[ReactNavigationV4Instrumentation] onStateChange called without a valid state.');
            return;
        }
        const currentRoute = this._getCurrentRouteFromState(state);
        // If the route is a different key, this is so we ignore actions that pertain to the same screen.
        if (!this._prevRoute || currentRoute.key !== this._prevRoute.key) {
            const originalContext = this._getTransactionContext(currentRoute, this._prevRoute);
            let mergedContext = originalContext;
            if (updateLatestTransaction && this._latestTransaction) {
                mergedContext = Object.assign(Object.assign({}, this._latestTransaction.toContext()), originalContext);
            }
            const finalContext = this._prepareFinalContext(mergedContext);
            if (updateLatestTransaction && this._latestTransaction) {
                // Update the latest transaction instead of calling onRouteWillChange
                this._latestTransaction.updateWithContext(finalContext);
                const isCustomName = mergedContext.name !== finalContext.name;
                this._latestTransaction.setName(finalContext.name, isCustomName ? customTransactionSource : defaultTransactionSource);
            }
            else {
                this._latestTransaction = this.onRouteWillChange(finalContext);
            }
            (_a = this._onConfirmRoute) === null || _a === void 0 ? void 0 : _a.call(this, finalContext);
            this._pushRecentRouteKey(currentRoute.key);
            this._prevRoute = currentRoute;
        }
    }
    /** Creates final transaction context before confirmation */
    _prepareFinalContext(mergedContext) {
        var _a;
        let finalContext = (_a = this._beforeNavigate) === null || _a === void 0 ? void 0 : _a.call(this, Object.assign({}, mergedContext));
        // This block is to catch users not returning a transaction context
        if (!finalContext) {
            logger.error(`[ReactNavigationV4Instrumentation] beforeNavigate returned ${finalContext}, return context.sampled = false to not send transaction.`);
            finalContext = Object.assign(Object.assign({}, mergedContext), { sampled: false });
        }
        if (finalContext.sampled === false) {
            this._onBeforeNavigateNotSampled(finalContext.name);
        }
        return finalContext;
    }
    /**
     * Gets the transaction context for a `NavigationRouteV4`
     */
    _getTransactionContext(route, previousRoute) {
        const data = {
            route: {
                name: route.routeName,
                key: route.key,
                // TODO: filter PII params instead of dropping them all
                params: {},
                hasBeenSeen: this._recentRouteKeys.includes(route.key),
            },
            previousRoute: previousRoute
                ? {
                    name: previousRoute.routeName,
                    key: previousRoute.key,
                    // TODO: filter PII params instead of dropping them all
                    params: {},
                }
                : null,
        };
        return {
            name: route.routeName,
            op: 'navigation',
            tags: {
                'routing.instrumentation': ReactNavigationV4Instrumentation.instrumentationName,
                'routing.route.name': route.routeName,
            },
            data,
        };
    }
    /**
     * Gets the current route given a navigation state
     */
    _getCurrentRouteFromState(state) {
        const parentRoute = state.routes[state.index];
        if ('index' in parentRoute &&
            'routes' in parentRoute &&
            typeof parentRoute.index === 'number' &&
            Array.isArray(parentRoute.routes)) {
            return this._getCurrentRouteFromState(parentRoute);
        }
        return parentRoute;
    }
    /** Cancels the latest transaction so it does not get sent to Sentry. */
    _discardLatestTransaction() {
        if (this._latestTransaction) {
            this._latestTransaction.sampled = false;
            this._latestTransaction.finish();
            this._latestTransaction = undefined;
        }
    }
}
ReactNavigationV4Instrumentation.instrumentationName = 'react-navigation-v4';
const INITIAL_TRANSACTION_CONTEXT_V4 = {
    name: 'App Launch',
    op: 'navigation',
    tags: {
        'routing.instrumentation': ReactNavigationV4Instrumentation.instrumentationName,
    },
    data: {},
    metadata: {
        source: 'view',
    },
};
export { ReactNavigationV4Instrumentation, INITIAL_TRANSACTION_CONTEXT_V4 };
//# sourceMappingURL=reactnavigationv4.js.map