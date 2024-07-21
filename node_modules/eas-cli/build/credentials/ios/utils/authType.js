"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAppStoreConnectTokenOnlyContext = void 0;
/** Is the request context App Store Connect only with no access to cookies authentication. */
function isAppStoreConnectTokenOnlyContext(authContext) {
    return !authContext.teamId && !!authContext.token;
}
exports.isAppStoreConnectTokenOnlyContext = isAppStoreConnectTokenOnlyContext;
