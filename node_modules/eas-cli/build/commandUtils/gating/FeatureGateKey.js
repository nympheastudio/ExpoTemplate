"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.featureGateDefaultValueWhenNoServerValue = exports.FeatureGateKey = void 0;
var FeatureGateKey;
(function (FeatureGateKey) {
    // for tests
    FeatureGateKey["TEST"] = "test";
})(FeatureGateKey || (exports.FeatureGateKey = FeatureGateKey = {}));
exports.featureGateDefaultValueWhenNoServerValue = {
    [FeatureGateKey.TEST]: true,
};
