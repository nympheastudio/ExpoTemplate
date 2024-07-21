"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appleRules = void 0;
const infoKeywordLength_1 = require("./infoKeywordLength");
const infoRestrictedWords_1 = require("./infoRestrictedWords");
exports.appleRules = [infoKeywordLength_1.infoKeywordLength, infoRestrictedWords_1.infoRestrictedWords];
