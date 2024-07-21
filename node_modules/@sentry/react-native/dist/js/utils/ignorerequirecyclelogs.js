import { LogBox } from 'react-native';
/**
 * This is a workaround for using fetch on RN, this is a known issue in react-native and only generates a warning.
 */
export function ignoreRequireCycleLogs() {
    LogBox.ignoreLogs(['Require cycle:']);
}
//# sourceMappingURL=ignorerequirecyclelogs.js.map