import { logger } from '@sentry/utils';
import { InternalRoutingInstrumentation } from './routingInstrumentation';
import { customTransactionSource, defaultTransactionSource, getBlankTransactionContext } from './utils';
const defaultOptions = {
    routeChangeTimeoutMs: 1000,
    enableTabsInstrumentation: true,
};
/**
 * Instrumentation for React Native Navigation. See docs or sample app for usage.
 *
 * How this works:
 * - `_onCommand` is called every time a commands happens and sets an IdleTransaction on the scope without any route context.
 * - `_onComponentWillAppear` is then called AFTER the state change happens due to a dispatch and sets the route context onto the active transaction.
 * - If `_onComponentWillAppear` isn't called within `options.routeChangeTimeoutMs` of the dispatch, then the transaction is not sampled and finished.
 */
export class ReactNativeNavigationInstrumentation extends InternalRoutingInstrumentation {
    constructor(
    /** The react native navigation `NavigationDelegate`. This is usually the import named `Navigation`. */
    navigation, options = {}) {
        super();
        this.name = ReactNativeNavigationInstrumentation.instrumentationName;
        this._prevComponentEvent = null;
        this._recentComponentIds = [];
        this._navigation = navigation;
        this._options = Object.assign(Object.assign({}, defaultOptions), options);
    }
    /**
     * Registers the event listeners for React Native Navigation
     */
    registerRoutingInstrumentation(listener, beforeNavigate, onConfirmRoute) {
        super.registerRoutingInstrumentation(listener, beforeNavigate, onConfirmRoute);
        this._navigation.events().registerCommandListener(this._onNavigation.bind(this));
        if (this._options.enableTabsInstrumentation) {
            this._navigation.events().registerBottomTabPressedListener(this._onNavigation.bind(this));
        }
        this._navigation.events().registerComponentWillAppearListener(this._onComponentWillAppear.bind(this));
    }
    /**
     * To be called when a navigation is initiated. (Command, BottomTabSelected, etc.)
     */
    _onNavigation() {
        if (this._latestTransaction) {
            this._discardLatestTransaction();
        }
        this._latestTransaction = this.onRouteWillChange(getBlankTransactionContext(ReactNativeNavigationInstrumentation.name));
        this._stateChangeTimeout = setTimeout(this._discardLatestTransaction.bind(this), this._options.routeChangeTimeoutMs);
    }
    /**
     * To be called AFTER the state has been changed to populate the transaction with the current route.
     */
    _onComponentWillAppear(event) {
        var _a, _b;
        if (!this._latestTransaction) {
            return;
        }
        // We ignore actions that pertain to the same screen.
        const isSameComponent = this._prevComponentEvent && event.componentId === this._prevComponentEvent.componentId;
        if (isSameComponent) {
            this._discardLatestTransaction();
            return;
        }
        this._clearStateChangeTimeout();
        const originalContext = this._latestTransaction.toContext();
        const routeHasBeenSeen = this._recentComponentIds.includes(event.componentId);
        const data = Object.assign(Object.assign({}, originalContext.data), { route: Object.assign(Object.assign({}, event), { name: event.componentName, hasBeenSeen: routeHasBeenSeen }), previousRoute: this._prevComponentEvent
                ? Object.assign(Object.assign({}, this._prevComponentEvent), { name: (_a = this._prevComponentEvent) === null || _a === void 0 ? void 0 : _a.componentName }) : null });
        const updatedContext = Object.assign(Object.assign({}, originalContext), { name: event.componentName, tags: Object.assign(Object.assign({}, originalContext.tags), { 'routing.route.name': event.componentName }), data });
        const finalContext = this._prepareFinalContext(updatedContext);
        this._latestTransaction.updateWithContext(finalContext);
        const isCustomName = updatedContext.name !== finalContext.name;
        this._latestTransaction.setName(finalContext.name, isCustomName ? customTransactionSource : defaultTransactionSource);
        (_b = this._onConfirmRoute) === null || _b === void 0 ? void 0 : _b.call(this, finalContext);
        this._prevComponentEvent = event;
        this._latestTransaction = undefined;
    }
    /** Creates final transaction context before confirmation */
    _prepareFinalContext(updatedContext) {
        var _a;
        let finalContext = (_a = this._beforeNavigate) === null || _a === void 0 ? void 0 : _a.call(this, Object.assign({}, updatedContext));
        // This block is to catch users not returning a transaction context
        if (!finalContext) {
            logger.error(`[${ReactNativeNavigationInstrumentation.name}] beforeNavigate returned ${finalContext}, return context.sampled = false to not send transaction.`);
            finalContext = Object.assign(Object.assign({}, updatedContext), { sampled: false });
        }
        if (finalContext.sampled === false) {
            logger.log(`[${ReactNativeNavigationInstrumentation.name}] Will not send transaction "${finalContext.name}" due to beforeNavigate.`);
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
        this._clearStateChangeTimeout();
    }
    /** Cancels the latest transaction so it does not get sent to Sentry. */
    _clearStateChangeTimeout() {
        if (typeof this._stateChangeTimeout !== 'undefined') {
            clearTimeout(this._stateChangeTimeout);
            this._stateChangeTimeout = undefined;
        }
    }
}
ReactNativeNavigationInstrumentation.instrumentationName = 'react-native-navigation';
//# sourceMappingURL=reactnativenavigation.js.map