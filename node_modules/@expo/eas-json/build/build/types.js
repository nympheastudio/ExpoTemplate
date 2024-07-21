"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceClass = exports.CredentialsSource = void 0;
const eas_build_job_1 = require("@expo/eas-build-job");
var CredentialsSource;
(function (CredentialsSource) {
    CredentialsSource["LOCAL"] = "local";
    CredentialsSource["REMOTE"] = "remote";
})(CredentialsSource || (exports.CredentialsSource = CredentialsSource = {}));
var ResourceClass;
(function (ResourceClass) {
    ResourceClass["DEFAULT"] = "default";
    ResourceClass["LARGE"] = "large";
    /**
     * @deprecated use M_MEDIUM instead
     */
    ResourceClass["M1_MEDIUM"] = "m1-medium";
    ResourceClass["MEDIUM"] = "medium";
    ResourceClass["M_MEDIUM"] = "m-medium";
    /**
     * @deprecated use LARGE instead
     */
    ResourceClass["M_LARGE"] = "m-large";
})(ResourceClass || (exports.ResourceClass = ResourceClass = {}));
