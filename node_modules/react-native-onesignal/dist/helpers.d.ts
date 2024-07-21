import { NativeModule } from 'react-native';
export declare function isValidCallback(handler: Function): void;
export declare function isNativeModuleLoaded(module: NativeModule): boolean;
/**
 * Returns whether the handler associated with the event name can have multiple instances set
 * @param  {String} eventName
 */
export declare function isMultipleInstancesPossible(eventName: string): boolean;
