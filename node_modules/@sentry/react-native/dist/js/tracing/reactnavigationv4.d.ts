import type { TransactionContext } from '@sentry/types';
import type { OnConfirmRoute, TransactionCreator } from './routingInstrumentation';
import { InternalRoutingInstrumentation } from './routingInstrumentation';
import type { BeforeNavigate } from './types';
export interface NavigationRouteV4 {
    routeName: string;
    key: string;
    params?: Record<string, any>;
}
export interface NavigationStateV4 {
    index: number;
    key: string;
    isTransitioning: boolean;
    routeName?: string;
    routes: (NavigationRouteV4 | NavigationStateV4)[];
}
export interface AppContainerInstance {
    _navigation: {
        state: NavigationStateV4;
        router: {
            getStateForAction: (action: any, state: NavigationStateV4) => NavigationStateV4;
        };
    };
}
interface ReactNavigationV4Options {
    /**
     * How long the instrumentation will wait for the route to mount after a change has been initiated,
     * before the transaction is discarded.
     * Time is in ms.
     *
     * Default: 1000
     */
    routeChangeTimeoutMs: number;
}
/**
 * Instrumentation for React-Navigation V4.
 * Register the app container with `registerAppContainer` to use, or see docs for more details.
 */
declare class ReactNavigationV4Instrumentation extends InternalRoutingInstrumentation {
    static instrumentationName: string;
    readonly name: string;
    private _appContainer;
    private readonly _maxRecentRouteLen;
    private _prevRoute?;
    private _recentRouteKeys;
    private _latestTransaction?;
    private _initialStateHandled;
    private _stateChangeTimeout?;
    private _options;
    constructor(options?: Partial<ReactNavigationV4Options>);
    /**
     * Extends by calling _handleInitialState at the end.
     */
    registerRoutingInstrumentation(listener: TransactionCreator, beforeNavigate: BeforeNavigate, onConfirmRoute: OnConfirmRoute): void;
    /**
     * Pass the ref to the app container to register it to the instrumentation
     * @param appContainerRef Ref to an `AppContainer`
     */
    registerAppContainer(appContainerRef: any): void;
    /**
     * Updates the latest transaction with the current state and calls beforeNavigate.
     */
    private _updateLatestTransaction;
    /**
     * Patches the react navigation router so we can listen to the route changes and attach the `IdleTransaction` before the
     * new screen is mounted.
     */
    private _patchRouter;
    /**
     * To be called on navigation state changes and creates the transaction.
     */
    private _onStateChange;
    /** Creates final transaction context before confirmation */
    private _prepareFinalContext;
    /**
     * Gets the transaction context for a `NavigationRouteV4`
     */
    private _getTransactionContext;
    /**
     * Gets the current route given a navigation state
     */
    private _getCurrentRouteFromState;
    /** Pushes a recent route key, and removes earlier routes when there is greater than the max length */
    private _pushRecentRouteKey;
    /** Helper to log a transaction that was not sampled due to beforeNavigate */
    private _onBeforeNavigateNotSampled;
    /** Cancels the latest transaction so it does not get sent to Sentry. */
    private _discardLatestTransaction;
}
declare const INITIAL_TRANSACTION_CONTEXT_V4: TransactionContext;
export { ReactNavigationV4Instrumentation, INITIAL_TRANSACTION_CONTEXT_V4 };
//# sourceMappingURL=reactnavigationv4.d.ts.map