"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ContextField_1 = tslib_1.__importDefault(require("./ContextField"));
class AnalyticsContextField extends ContextField_1.default {
    async getValueAsync({ analytics }) {
        return analytics;
    }
}
exports.default = AnalyticsContextField;
