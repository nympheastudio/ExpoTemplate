import * as React from 'react';
import { requireNativeComponent, UIManager, View } from 'react-native';
const RNSentryOnDrawReporterClass = 'RNSentryOnDrawReporter';
export const nativeComponentExists = UIManager.hasViewManagerConfig
    ? UIManager.hasViewManagerConfig(RNSentryOnDrawReporterClass)
    : false;
/**
 * This is a fallback component for environments where the native component is not available.
 */
class RNSentryOnDrawReporterNoop extends React.Component {
    render() {
        return (React.createElement(View, Object.assign({}, this.props)));
    }
}
let RNSentryOnDrawReporter;
/**
 * Native component that reports the on draw timestamp.
 */
export const getRNSentryOnDrawReporter = () => {
    if (!RNSentryOnDrawReporter) {
        RNSentryOnDrawReporter = nativeComponentExists
            ? requireNativeComponent(RNSentryOnDrawReporterClass)
            : RNSentryOnDrawReporterNoop;
    }
    return RNSentryOnDrawReporter;
};
//# sourceMappingURL=timetodisplaynative.js.map