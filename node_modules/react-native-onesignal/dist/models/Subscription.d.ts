export declare type IosPermissionStatus = 0 | 1 | 2 | 3 | 4;
export interface DeviceState {
    userId: string;
    pushToken: string;
    emailUserId: string;
    emailAddress: string;
    smsUserId: string;
    smsNumber: string;
    isSubscribed: boolean;
    isPushDisabled: boolean;
    isEmailSubscribed: boolean;
    isSMSSubscribed: boolean;
    hasNotificationPermission?: boolean;
    notificationPermissionStatus?: IosPermissionStatus;
}
export interface ChangeEvent<ObserverChangeEvent> {
    from: ObserverChangeEvent;
    to: ObserverChangeEvent;
}
export declare type ObserverChangeEvent = PermissionChange | SubscriptionChange | EmailSubscriptionChange | SMSSubscriptionChange;
export interface PermissionChange {
    status?: IosPermissionStatus;
    hasPrompted?: boolean;
    provisional?: boolean;
    areNotificationsEnabled?: boolean;
}
export interface SubscriptionChange {
    userId?: string;
    pushToken?: string;
    isSubscribed: boolean;
    isPushDisabled: boolean;
}
export interface EmailSubscriptionChange {
    emailAddress?: string;
    emailUserId?: string;
    isEmailSubscribed: boolean;
}
export interface SMSSubscriptionChange {
    smsNumber?: string;
    smsUserId?: string;
    isSMSSubscribed: boolean;
}
