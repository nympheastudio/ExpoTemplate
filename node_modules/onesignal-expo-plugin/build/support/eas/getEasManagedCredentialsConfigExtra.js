"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iosConstants_1 = require("../iosConstants");
function getEasManagedCredentialsConfigExtra(config) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    return {
        ...config.extra,
        eas: {
            ...(_a = config.extra) === null || _a === void 0 ? void 0 : _a.eas,
            build: {
                ...(_c = (_b = config.extra) === null || _b === void 0 ? void 0 : _b.eas) === null || _c === void 0 ? void 0 : _c.build,
                experimental: {
                    ...(_f = (_e = (_d = config.extra) === null || _d === void 0 ? void 0 : _d.eas) === null || _e === void 0 ? void 0 : _e.build) === null || _f === void 0 ? void 0 : _f.experimental,
                    ios: {
                        ...(_k = (_j = (_h = (_g = config.extra) === null || _g === void 0 ? void 0 : _g.eas) === null || _h === void 0 ? void 0 : _h.build) === null || _j === void 0 ? void 0 : _j.experimental) === null || _k === void 0 ? void 0 : _k.ios,
                        appExtensions: [
                            ...((_r = (_q = (_p = (_o = (_m = (_l = config.extra) === null || _l === void 0 ? void 0 : _l.eas) === null || _m === void 0 ? void 0 : _m.build) === null || _o === void 0 ? void 0 : _o.experimental) === null || _p === void 0 ? void 0 : _p.ios) === null || _q === void 0 ? void 0 : _q.appExtensions) !== null && _r !== void 0 ? _r : []),
                            {
                                // keep in sync with native changes in NSE
                                targetName: iosConstants_1.NSE_TARGET_NAME,
                                bundleIdentifier: `${(_s = config === null || config === void 0 ? void 0 : config.ios) === null || _s === void 0 ? void 0 : _s.bundleIdentifier}.${iosConstants_1.NSE_TARGET_NAME}`,
                                entitlements: {
                                    'com.apple.security.application-groups': [
                                        `group.${(_t = config === null || config === void 0 ? void 0 : config.ios) === null || _t === void 0 ? void 0 : _t.bundleIdentifier}.onesignal`
                                    ]
                                },
                            }
                        ]
                    }
                }
            }
        }
    };
}
exports.default = getEasManagedCredentialsConfigExtra;
