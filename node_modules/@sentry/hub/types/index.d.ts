export type { Carrier, Layer } from '@sentry/core';
import { Hub as HubCore, Scope as ScopeCore, SessionFlusher as SessionFlusherCore, addBreadcrumb as addBreadcrumbCore, addGlobalEventProcessor as addGlobalEventProcessorCore, captureEvent as captureEventCore, captureException as captureExceptionCore, captureMessage as captureMessageCore, closeSession as closeSessionCore, configureScope as configureScopeCore, getCurrentHub as getCurrentHubCore, getHubFromCarrier as getHubFromCarrierCore, getMainCarrier as getMainCarrierCore, makeMain as makeMainCore, makeSession as makeSessionCore, setContext as setContextCore, setExtra as setExtraCore, setExtras as setExtrasCore, setHubOnCarrier as setHubOnCarrierCore, setTag as setTagCore, setTags as setTagsCore, setUser as setUserCore, startTransaction as startTransactionCore, updateSession as updateSessionCore, withScope as withScopeCore } from '@sentry/core';
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8
 */
export declare class Hub extends HubCore {
}
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8
 */
export declare class Scope extends ScopeCore {
}
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
export declare const getCurrentHub: typeof getCurrentHubCore;
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
export declare const addGlobalEventProcessor: typeof addGlobalEventProcessorCore;
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
export declare const getHubFromCarrier: typeof getHubFromCarrierCore;
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
export declare const getMainCarrier: typeof getMainCarrierCore;
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
export declare const makeMain: typeof makeMainCore;
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
export declare const setHubOnCarrier: typeof setHubOnCarrierCore;
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
export declare const SessionFlusher: typeof SessionFlusherCore;
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
export declare const closeSession: typeof closeSessionCore;
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
export declare const makeSession: typeof makeSessionCore;
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
export declare const updateSession: typeof updateSessionCore;
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
export declare const addBreadcrumb: typeof addBreadcrumbCore;
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
export declare const captureException: typeof captureExceptionCore;
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
export declare const captureEvent: typeof captureEventCore;
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
export declare const captureMessage: typeof captureMessageCore;
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
export declare const configureScope: typeof configureScopeCore;
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
export declare const startTransaction: typeof startTransactionCore;
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
export declare const setContext: typeof setContextCore;
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
export declare const setExtra: typeof setExtraCore;
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
export declare const setExtras: typeof setExtrasCore;
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
export declare const setTag: typeof setTagCore;
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
export declare const setTags: typeof setTagsCore;
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
export declare const setUser: typeof setUserCore;
/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
export declare const withScope: typeof withScopeCore;
//# sourceMappingURL=index.d.ts.map