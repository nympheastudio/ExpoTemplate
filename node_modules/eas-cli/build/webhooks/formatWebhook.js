"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatWebhook = void 0;
const tslib_1 = require("tslib");
const formatFields_1 = tslib_1.__importDefault(require("../utils/formatFields"));
function formatWebhook(webhook) {
    return (0, formatFields_1.default)([
        { label: 'ID', value: webhook.id },
        { label: 'Event', value: webhook.event },
        { label: 'URL', value: webhook.url },
        { label: 'Created at', value: new Date(webhook.createdAt).toLocaleString() },
        { label: 'Updated at', value: new Date(webhook.updatedAt).toLocaleString() },
    ]);
}
exports.formatWebhook = formatWebhook;
