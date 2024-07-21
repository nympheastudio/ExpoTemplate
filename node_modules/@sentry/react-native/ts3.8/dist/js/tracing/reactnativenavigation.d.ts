import type { EmitterSubscription } from '../utils/rnlibrariesinterface';
import type { OnConfirmRoute, TransactionCreator } from './routingInstrumentation';
import { InternalRoutingInstrumentation } from './routingInstrumentation';
import type { BeforeNavigate } from './types';
interface ReactNativeNavigationOptions {
    /**
     * How long the instrumentation will wait for the route to mount after a change has been initiated,
     * before the transaction is discarded.
     * Time is in ms.
     *
     * Default: 1000
     */
    routeChangeTimeoutMs: number;
    /**
     * Instrumentation will create a transaction on tab change.
     * By default only navigation commands create transactions.
     *
     * Default: true
     */
    enableTabsInstrumentation: boolean;
}
interface ComponentEvent {
    componentId: string;
}
type ComponentType = 'Component' | 'TopBarTitle' | 'TopBarBackground' | 'TopBarButton';
export interface ComponentWillAppearEvent extends ComponentEvent {
    componentName: string;
    passProps?: Record<string | number | symbol, unknown>;
    componentType: ComponentType;
}
export interface EventSubscription {
    remove(): void;
}
export interface BottomTabPressedEvent {
    tabIndex: number;
}
export interface EventsRegistry {
    registerComponentWillAppearListener(callback: (event: ComponentWillAppearEvent) => void): EmitterSubscription;
    registerCommandListener(callback: (name: string, params: unknown) => void): EventSubscription;
    registerBottomTabPressedListener(callback: (event: BottomTabPressedEvent) => void): EmitterSubscription;
}
export interface NavigationDelegate {
    events: () => EventsRegistry;
}
/**
 * Instrumentation for React Native Navigation. See docs or sample app for usage.
 *
 * How this works:
 * - `_onCommand` is called every time a commands happens and sets an IdleTransaction on the scope without any route context.
 * - `_onComponentWillAppear` is then called AFTER the state change happens due to a dispatch and sets the route context onto the active transaction.
 * - If `_onComponentWillAppear` isn't called within `options.routeChangeTimeoutMs` of the dispatch, then the transaction is not sampled and finished.
 */
export declare class ReactNativeNavigationInstrumentation extends InternalRoutingInstrumentation {
    static instrumentationName: string;
    readonly name: string;
    private _navigation;
    private _options;
    private _prevComponentEvent;
    private _latestTransaction?;
    private _recentComponentIds;
    private _stateChangeTimeout?;
    constructor(
    /** The react native navigation `NavigationDelegate`. This is usually the import named `Navigation`. */
    navigation: unknown, options?: Partial<ReactNativeNavigationOptions>);
    /**
     * Registers the event listeners for React Native Navigation
     */
    registerRoutingInstrumentation(listener: TransactionCreator, beforeNavigate: BeforeNavigate, onConfirmRoute: OnConfirmRoute): void;
    /**
     * To be called when a navigation is initiated. (Command, BottomTabSelected, etc.)
     */
    private _onNavigation;
    /**
     * To be called AFTER the state has been changed to populate the transaction with the current route.
     */
    private _onComponentWillAppear;
    /** Creates final transaction context before confirmation */
    private _prepareFinalContext;
    /** Cancels the latest transaction so it does not get sent to Sentry. */
    private _discardLatestTransaction;
    /** Cancels the latest transaction so it does not get sent to Sentry. */
    private _clearStateChangeTimeout;
}
export {};
//# sourceMappingURL=reactnativenavigation.d.ts.map
