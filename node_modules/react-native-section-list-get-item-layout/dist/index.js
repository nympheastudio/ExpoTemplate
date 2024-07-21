"use strict";
exports.__esModule = true;
exports["default"] = (function (_a) {
    var getItemHeight = _a.getItemHeight, _b = _a.getSeparatorHeight, getSeparatorHeight = _b === void 0 ? function () { return 0; } : _b, _c = _a.getSectionHeaderHeight, getSectionHeaderHeight = _c === void 0 ? function () { return 0; } : _c, _d = _a.getSectionFooterHeight, getSectionFooterHeight = _d === void 0 ? function () { return 0; } : _d, _e = _a.listHeaderHeight, listHeaderHeight = _e === void 0 ? 0 : _e;
    return function (data, index) {
        var i = 0;
        var sectionIndex = 0;
        var elementPointer = { type: 'SECTION_HEADER' };
        var offset = typeof listHeaderHeight === 'function'
            ? listHeaderHeight()
            : listHeaderHeight;
        while (i < index) {
            switch (elementPointer.type) {
                case 'SECTION_HEADER': {
                    var sectionData = data[sectionIndex].data;
                    offset += getSectionHeaderHeight(sectionIndex);
                    // If this section is empty, we go right to the footer...
                    if (sectionData.length === 0) {
                        elementPointer = { type: 'SECTION_FOOTER' };
                        // ...otherwise we make elementPointer point at the first row in this section
                    }
                    else {
                        elementPointer = { type: 'ROW', index: 0 };
                    }
                    break;
                }
                case 'ROW': {
                    var sectionData = data[sectionIndex].data;
                    var rowIndex = elementPointer.index;
                    offset += getItemHeight(sectionData[rowIndex], sectionIndex, rowIndex);
                    elementPointer.index += 1;
                    if (rowIndex === sectionData.length - 1) {
                        elementPointer = { type: 'SECTION_FOOTER' };
                    }
                    else {
                        offset += getSeparatorHeight(sectionIndex, rowIndex);
                    }
                    break;
                }
                case 'SECTION_FOOTER': {
                    offset += getSectionFooterHeight(sectionIndex);
                    sectionIndex += 1;
                    elementPointer = { type: 'SECTION_HEADER' };
                    break;
                }
            }
            i += 1;
        }
        var length;
        switch (elementPointer.type) {
            case 'SECTION_HEADER':
                length = getSectionHeaderHeight(sectionIndex);
                break;
            case 'ROW':
                var rowIndex = elementPointer.index;
                length = getItemHeight(data[sectionIndex].data[rowIndex], sectionIndex, rowIndex);
                break;
            case 'SECTION_FOOTER':
                length = getSectionFooterHeight(sectionIndex);
                break;
            default:
                throw new Error('Unknown elementPointer.type');
        }
        return { length: length, offset: offset, index: index };
    };
});
//# sourceMappingURL=index.js.map