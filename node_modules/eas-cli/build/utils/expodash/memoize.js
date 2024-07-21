"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoize = void 0;
/** `lodash.memoize` */
function memoize(fn) {
    const cache = {};
    return ((...args) => {
        const key = JSON.stringify(args);
        if (cache[key]) {
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    });
}
exports.memoize = memoize;
