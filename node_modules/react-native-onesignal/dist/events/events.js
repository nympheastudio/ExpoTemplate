"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMS_SUBSCRIPTION_CHANGED = exports.EMAIL_SUBSCRIPTION_CHANGED = exports.SUBSCRIPTION_CHANGED = exports.PERMISSION_CHANGED = exports.IN_APP_MESSAGE_DID_DISMISS = exports.IN_APP_MESSAGE_WILL_DISMISS = exports.IN_APP_MESSAGE_DID_DISPLAY = exports.IN_APP_MESSAGE_WILL_DISPLAY = exports.IN_APP_MESSAGE_CLICKED = exports.NOTIFICATION_OPENED = exports.NOTIFICATION_WILL_SHOW = void 0;
// events
exports.NOTIFICATION_WILL_SHOW = 'OneSignal-notificationWillShowInForeground';
exports.NOTIFICATION_OPENED = 'OneSignal-remoteNotificationOpened';
exports.IN_APP_MESSAGE_CLICKED = 'OneSignal-inAppMessageClicked';
// In-App Message lifecycle events
exports.IN_APP_MESSAGE_WILL_DISPLAY = 'OneSignal-inAppMessageWillDisplay';
exports.IN_APP_MESSAGE_DID_DISPLAY = 'OneSignal-inAppMessageDidDisplay';
exports.IN_APP_MESSAGE_WILL_DISMISS = 'OneSignal-inAppMessageWillDismiss';
exports.IN_APP_MESSAGE_DID_DISMISS = 'OneSignal-inAppMessageDidDismiss';
exports.PERMISSION_CHANGED = 'OneSignal-permissionChanged';
exports.SUBSCRIPTION_CHANGED = 'OneSignal-subscriptionChanged';
exports.EMAIL_SUBSCRIPTION_CHANGED = 'OneSignal-emailSubscriptionChanged';
exports.SMS_SUBSCRIPTION_CHANGED = 'OneSignal-smsSubscriptionChanged';
