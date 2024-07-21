import OSNotification from '../OSNotification';
export default class NotificationReceivedEvent {
    private notification;
    constructor(receivedEvent: OSNotification);
    complete(notification?: OSNotification): void;
    getNotification(): OSNotification;
}
