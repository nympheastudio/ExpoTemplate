import OSNotification from '../OSNotification';
export declare type OpenedEventActionType = 0 | 1;
export interface OpenedEvent {
    action: OpenedEventAction;
    notification: OSNotification;
}
export interface OpenedEventAction {
    type: OpenedEventActionType;
}
