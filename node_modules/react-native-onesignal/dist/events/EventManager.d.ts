import { EmitterSubscription, NativeModule } from 'react-native';
import { ChangeEvent } from '../models/Subscription';
export default class EventManager {
    private RNOneSignal;
    private oneSignalEventEmitter;
    private eventHandlerMap;
    private eventHandlerArrayMap;
    private listeners;
    constructor(RNOneSignal: NativeModule);
    setupListeners(): void;
    clearHandlers(): void;
    /**
     * Sets the event handler on the JS side of the bridge
     * Supports only one handler at a time
     * @param  {string} eventName
     * @param  {function} handler
     * @returns void
     */
    setEventHandler<T>(eventName: string, handler: (event: T) => void): void;
    /**
     * Adds the event handler to the corresponding handler array on the JS side of the bridge
     * @param  {string} eventName
     * @param  {function} handler
     * @returns void
     */
    addEventHandler<T>(eventName: string, handler: (event: ChangeEvent<T>) => void): void;
    /**
     * clears the event handler(s) for the event name
     * @param  {string} eventName
     * @returns void
     */
    clearEventHandler(eventName: string): void;
    generateEventListener(eventName: string): EmitterSubscription;
    getFinalPayload(eventName: string, payload: Object): Object;
}
