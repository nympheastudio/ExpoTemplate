import { Platform } from 'react-native';
import { getExpoConstants } from './utils/expomodules';
/**
 * If the user has not explicitly set `enableNativeNagger`
 * the function enables native nagging based on the current
 * environment.
 */
export function shouldEnableNativeNagger(userOptions) {
    if (typeof userOptions === 'boolean') {
        // User can override the default behavior
        return userOptions;
    }
    if (Platform.OS === 'web' || Platform.OS === 'windows') {
        // We don't want to nag on known platforms that don't support native
        return false;
    }
    const expoConstants = getExpoConstants();
    if (expoConstants && expoConstants.appOwnership === 'expo') {
        // If the app is running in Expo Go, we don't want to nag
        return false;
    }
    return true;
}
//# sourceMappingURL=options.js.map