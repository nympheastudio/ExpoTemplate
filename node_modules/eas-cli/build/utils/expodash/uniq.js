"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function uniq(items) {
    const set = new Set(items);
    return [...set];
}
exports.default = uniq;
