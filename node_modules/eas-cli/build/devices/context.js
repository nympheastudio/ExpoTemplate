"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContextAsync = void 0;
async function createContextAsync({ appStore, user, graphqlClient, projectId, }) {
    return {
        appStore,
        user,
        graphqlClient,
        projectId: projectId ?? null,
    };
}
exports.createContextAsync = createContextAsync;
