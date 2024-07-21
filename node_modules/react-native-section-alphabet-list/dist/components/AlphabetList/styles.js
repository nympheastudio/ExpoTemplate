"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var sizes_1 = require("../../values/sizes");
var colors_1 = require("../../values/colors");
exports.styles = react_native_1.StyleSheet.create({
    container: {
        position: "relative",
    },
    listItemContainer: {
        flex: 1,
        height: sizes_1.sizes.itemHeight,
        paddingHorizontal: sizes_1.sizes.spacing.regular,
        justifyContent: "center",
        borderTopColor: colors_1.colors.seperatorLine,
        borderTopWidth: 1,
    },
    listItemLabel: {
        color: colors_1.colors.text.dark,
        fontSize: 14,
    },
    sectionHeaderContainer: {
        height: sizes_1.sizes.headerHeight,
        backgroundColor: colors_1.colors.background.dark,
        justifyContent: "center",
        paddingHorizontal: sizes_1.sizes.spacing.regular,
    },
    sectionHeaderLabel: {
        color: colors_1.colors.background.light,
    },
});
