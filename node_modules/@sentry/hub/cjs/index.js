Object.defineProperty(exports, '__esModule', { value: true });

const core = require('@sentry/core');

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8
 */
// eslint-disable-next-line deprecation/deprecation
class Hub extends core.Hub {}

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8
 */
class Scope extends core.Scope {}

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
// eslint-disable-next-line deprecation/deprecation
const getCurrentHub = core.getCurrentHub;

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */

const addGlobalEventProcessor = core.addGlobalEventProcessor; // eslint-disable-line deprecation/deprecation

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
const getHubFromCarrier = core.getHubFromCarrier;

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
const getMainCarrier = core.getMainCarrier;

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
// eslint-disable-next-line deprecation/deprecation
const makeMain = core.makeMain;

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
const setHubOnCarrier = core.setHubOnCarrier;

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
const SessionFlusher = core.SessionFlusher;

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
const closeSession = core.closeSession;

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
const makeSession = core.makeSession;

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
const updateSession = core.updateSession;

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
const addBreadcrumb = core.addBreadcrumb;

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
const captureException = core.captureException;

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
const captureEvent = core.captureEvent;

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
const captureMessage = core.captureMessage;

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
// eslint-disable-next-line deprecation/deprecation
const configureScope = core.configureScope;

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
// eslint-disable-next-line deprecation/deprecation
const startTransaction = core.startTransaction;

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
const setContext = core.setContext;

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
const setExtra = core.setExtra;

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
const setExtras = core.setExtras;

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
const setTag = core.setTag;

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
const setTags = core.setTags;

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
const setUser = core.setUser;

/**
 * @deprecated This export has moved to @sentry/core. The @sentry/hub package will be removed in v8.
 */
const withScope = core.withScope;

exports.Hub = Hub;
exports.Scope = Scope;
exports.SessionFlusher = SessionFlusher;
exports.addBreadcrumb = addBreadcrumb;
exports.addGlobalEventProcessor = addGlobalEventProcessor;
exports.captureEvent = captureEvent;
exports.captureException = captureException;
exports.captureMessage = captureMessage;
exports.closeSession = closeSession;
exports.configureScope = configureScope;
exports.getCurrentHub = getCurrentHub;
exports.getHubFromCarrier = getHubFromCarrier;
exports.getMainCarrier = getMainCarrier;
exports.makeMain = makeMain;
exports.makeSession = makeSession;
exports.setContext = setContext;
exports.setExtra = setExtra;
exports.setExtras = setExtras;
exports.setHubOnCarrier = setHubOnCarrier;
exports.setTag = setTag;
exports.setTags = setTags;
exports.setUser = setUser;
exports.startTransaction = startTransaction;
exports.updateSession = updateSession;
exports.withScope = withScope;
//# sourceMappingURL=index.js.map
