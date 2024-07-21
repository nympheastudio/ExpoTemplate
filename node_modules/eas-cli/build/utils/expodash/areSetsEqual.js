"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function areSetsEqual(a, b) {
    return a.size === b.size && [...a].every(value => b.has(value));
}
exports.default = areSetsEqual;
