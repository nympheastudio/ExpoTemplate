"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSessionSecretAndUserAsync = void 0;
const fetchUser_1 = require("./fetchUser");
const api_1 = require("../api");
async function fetchSessionSecretAndUserAsync({ username, password, otp, }) {
    // this is a logged-out endpoint
    const apiV2Client = new api_1.ApiV2Client({
        accessToken: null,
        sessionSecret: null,
    });
    const body = await apiV2Client.postAsync('auth/loginAsync', {
        body: { username, password, otp },
    });
    const { sessionSecret } = body.data;
    const userData = await (0, fetchUser_1.fetchUserAsync)({ sessionSecret });
    return {
        sessionSecret,
        id: userData.id,
        username: userData.username,
    };
}
exports.fetchSessionSecretAndUserAsync = fetchSessionSecretAndUserAsync;
