"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function differenceBy(a, b, key) {
    const valuesInB = b.map(j => j[key]);
    return a.filter(i => !valuesInB.includes(i[key]));
}
exports.default = differenceBy;
