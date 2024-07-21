import type { ConfigPlugin } from 'expo/config-plugins';
interface PluginProps {
    organization?: string;
    project?: string;
    authToken?: string;
    url?: string;
}
export declare function getSentryProperties(props: PluginProps | void): string | null;
declare const withSentry: ConfigPlugin<void | PluginProps>;
export { withSentry };
