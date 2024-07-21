"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSectionData = function (data, charIndex, uncategorizedAtTop) {
    if (uncategorizedAtTop === void 0) { uncategorizedAtTop = false; }
    var validLettersMap = getValidLettersMap(charIndex);
    var alphabetEntrySet = getAlphabetEntrySet(data, validLettersMap);
    return alphabetEntrySet
        .map(formatEntry)
        .sort(function (a, b) { return sortSectionsByCharIndex(a, b, validLettersMap, uncategorizedAtTop); })
        .map(function (section, index) { return (__assign(__assign({}, section), { index: index })); });
};
var getValidLettersMap = function (letterMap) {
    var map = {};
    letterMap.forEach(function (letter, i) {
        map[letter.toLowerCase()] = i + 1;
    });
    return map;
};
var getAlphabetEntrySet = function (data, validLettersMap) {
    var alphabetSet = {};
    data.forEach(function (item) {
        var letter = getItemFirstLetter(item.value, validLettersMap);
        if (!letter)
            return;
        if (!alphabetSet[letter]) {
            alphabetSet[letter] = [];
        }
        alphabetSet[letter].push(item);
    });
    return Object.entries(alphabetSet);
};
var getItemFirstLetter = function (value, validLettersMap) {
    var firstChar = value.substring(0, 1);
    var isValidLetter = validLettersMap[firstChar.toLowerCase()];
    if (isValidLetter) {
        return firstChar.toUpperCase();
    }
    return "#";
};
var formatEntry = function (entry) {
    var title = entry[0], unsortedData = entry[1];
    var data = unsortedData.sort(function (a, b) { return alphabeticComparison(a.value, b.value); });
    return { title: title, data: data };
};
var isLetterHash = function (charOne, charTwo) { return charOne !== "#" && charTwo === "#"; };
var sortSectionsByCharIndex = function (a, b, validLettersMap, uncategorizedAtTop) {
    var charA = a.title.toLowerCase();
    var charB = b.title.toLowerCase();
    var isBHash = isLetterHash(charA, charB);
    if (isBHash)
        return uncategorizedAtTop ? 1 : -1;
    var isAHash = isLetterHash(charB, charA);
    if (isAHash)
        return uncategorizedAtTop ? -1 : 1;
    var charAPosition = validLettersMap[charA];
    var charBPosition = validLettersMap[charB];
    return charAPosition - charBPosition;
};
var alphabeticComparison = function (a, b) {
    var aCap = a.toUpperCase();
    var bCap = b.toUpperCase();
    if (aCap < bCap)
        return -1;
    if (aCap > bCap)
        return 1;
    return 0;
};
