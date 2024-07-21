"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("./constants");

/**
 * function addPlaceholder
 * @param {string[]} output
 * @param {number} index
 * @param {string} placeholder
 * @returns {string[]}
 */
function addPlaceholder(output, index, placeholder) {
  for (let newIndex = index; newIndex < output.length; newIndex++) {
    if (output[newIndex] === _constants.DIGIT || output[newIndex] === _constants.ALPHA || output[newIndex] === _constants.ALPHANUM) {
      // eslint-disable-next-line no-param-reassign
      output[newIndex] = placeholder;
    }
  }

  return output;
}

var _default = addPlaceholder;
exports.default = _default;
//# sourceMappingURL=addPlaceholder.js.map