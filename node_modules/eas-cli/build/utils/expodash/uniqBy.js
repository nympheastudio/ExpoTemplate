"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function uniqBy(list, getKey) {
    const uniqueValues = new Set();
    const result = [];
    for (const i of list) {
        if (!uniqueValues.has(getKey(i))) {
            result.push(i);
            uniqueValues.add(getKey(i));
        }
    }
    return result;
}
exports.default = uniqBy;
