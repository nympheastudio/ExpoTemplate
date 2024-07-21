"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleTeamType = exports.AuthenticationMode = void 0;
var AuthenticationMode;
(function (AuthenticationMode) {
    /** App Store API requests will be made using the official API via an API key, used for CI environments where 2FA cannot be performed. */
    AuthenticationMode[AuthenticationMode["API_KEY"] = 0] = "API_KEY";
    /** Uses cookies based authentication and the unofficial App Store web API, this provides more functionality than the official API but cannot be reliably used in CI because it requires 2FA. */
    AuthenticationMode[AuthenticationMode["USER"] = 1] = "USER";
})(AuthenticationMode || (exports.AuthenticationMode = AuthenticationMode = {}));
var AppleTeamType;
(function (AppleTeamType) {
    AppleTeamType["IN_HOUSE"] = "IN_HOUSE";
    AppleTeamType["COMPANY_OR_ORGANIZATION"] = "COMPANY_OR_ORGANIZATION";
    AppleTeamType["INDIVIDUAL"] = "INDIVIDUAL";
})(AppleTeamType || (exports.AppleTeamType = AppleTeamType = {}));
