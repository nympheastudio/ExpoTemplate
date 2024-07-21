"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSessionSecretAndSsoUserAsync = void 0;
const expoSsoLauncher_1 = require("./expoSsoLauncher");
const fetchUser_1 = require("./fetchUser");
const api_1 = require("../api");
async function fetchSessionSecretAndSsoUserAsync() {
    const sessionSecret = await (0, expoSsoLauncher_1.getSessionUsingBrowserAuthFlowAsync)({
        expoWebsiteUrl: (0, api_1.getExpoWebsiteBaseUrl)(),
    });
    const userData = await (0, fetchUser_1.fetchUserAsync)({ sessionSecret });
    return {
        sessionSecret,
        id: userData.id,
        username: userData.username,
    };
}
exports.fetchSessionSecretAndSsoUserAsync = fetchSessionSecretAndSsoUserAsync;
