"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_section_list_get_item_layout_1 = __importDefault(require("react-native-section-list-get-item-layout"));
var getSectionData_1 = require("../../utils/getSectionData");
var ListLetterIndex_1 = require("../ListLetterIndex");
var styles_1 = require("./styles");
var sizes_1 = require("../../values/sizes");
var consts_1 = require("../../values/consts");
exports.AlphabetList = function (props) {
    var data = props.data, _a = props.index, index = _a === void 0 ? consts_1.DEFAULT_CHAR_INDEX : _a, style = props.style, indexContainerStyle = props.indexContainerStyle, indexLetterStyle = props.indexLetterStyle, indexLetterContainerStyle = props.indexLetterContainerStyle, letterListContainerStyle = props.letterListContainerStyle, _b = props.getItemHeight, onGetItemHeight = _b === void 0 ? function () { return sizes_1.sizes.itemHeight; } : _b, _c = props.sectionHeaderHeight, sectionHeaderHeight = _c === void 0 ? sizes_1.sizes.itemHeight : _c, _d = props.listHeaderHeight, listHeaderHeight = _d === void 0 ? sizes_1.sizes.listHeaderHeight : _d, _e = props.uncategorizedAtTop, uncategorizedAtTop = _e === void 0 ? false : _e, renderCustomSectionHeader = props.renderCustomSectionHeader, renderCustomItem = props.renderCustomItem, renderCustomListHeader = props.renderCustomListHeader, renderCustomIndexLetter = props.renderCustomIndexLetter, sectionListProps = __rest(props, ["data", "index", "style", "indexContainerStyle", "indexLetterStyle", "indexLetterContainerStyle", "letterListContainerStyle", "getItemHeight", "sectionHeaderHeight", "listHeaderHeight", "uncategorizedAtTop", "renderCustomSectionHeader", "renderCustomItem", "renderCustomListHeader", "renderCustomIndexLetter"]);
    var sectionListRef = react_1.useRef(null);
    var _f = react_1.useState([]), sectionData = _f[0], setSectionData = _f[1];
    react_1.useEffect(function () {
        setSectionData(getSectionData_1.getSectionData(data, index, uncategorizedAtTop));
    }, [data]);
    var onScrollToSection = function (sectionIndex) {
        var sectionList = sectionListRef.current;
        if (!sectionList)
            return;
        sectionList.scrollToLocation({
            sectionIndex: sectionIndex,
            itemIndex: 0,
        });
    };
    var onGetItemLayout = react_native_section_list_get_item_layout_1.default({
        getItemHeight: function (_rowData, sectionIndex, rowIndex) {
            return onGetItemHeight(sectionIndex, rowIndex);
        },
        getSectionHeaderHeight: function () { return sectionHeaderHeight; },
        getSectionFooterHeight: function () { return 0; },
        listHeaderHeight: listHeaderHeight,
    });
    var onRenderSectionHeader = function (_a) {
        var section = _a.section;
        if (renderCustomSectionHeader)
            return renderCustomSectionHeader(section);
        return (<react_native_1.View testID="header" style={styles_1.styles.sectionHeaderContainer}>
        <react_native_1.Text testID="header__label" style={styles_1.styles.sectionHeaderLabel}>{section.title}</react_native_1.Text>
      </react_native_1.View>);
    };
    var onRenderItem = function (_a) {
        var item = _a.item;
        if (renderCustomItem)
            return renderCustomItem(item);
        return (<react_native_1.View testID="cell" style={styles_1.styles.listItemContainer}>
        <react_native_1.Text testID="cell__label" style={styles_1.styles.listItemLabel}>{item.value}</react_native_1.Text>
      </react_native_1.View>);
    };
    return (<react_native_1.View style={[styles_1.styles.container, style]}>
      <react_native_1.SectionList {...sectionListProps} testID="sectionList" ref={sectionListRef} sections={sectionData} keyExtractor={function (item) { return item.key; }} renderItem={onRenderItem} renderSectionHeader={onRenderSectionHeader} ListHeaderComponent={renderCustomListHeader} getItemLayout={onGetItemLayout}/>

      <ListLetterIndex_1.ListLetterIndex sectionData={sectionData} onPressLetter={onScrollToSection} indexContainerStyle={indexContainerStyle} indexLetterStyle={indexLetterStyle} indexLetterContainerStyle={indexLetterContainerStyle} letterListContainerStyle={letterListContainerStyle} renderCustomIndexLetter={renderCustomIndexLetter}/>
    </react_native_1.View>);
};
