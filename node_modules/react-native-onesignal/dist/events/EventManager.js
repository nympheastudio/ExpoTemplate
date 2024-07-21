"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var NotificationReceivedEvent_1 = __importDefault(require("./NotificationReceivedEvent"));
var helpers_1 = require("../helpers");
var events_1 = require("./events");
var eventList = [
    events_1.PERMISSION_CHANGED,
    events_1.SUBSCRIPTION_CHANGED,
    events_1.NOTIFICATION_WILL_SHOW,
    events_1.NOTIFICATION_OPENED,
    events_1.IN_APP_MESSAGE_CLICKED,
    events_1.EMAIL_SUBSCRIPTION_CHANGED,
    events_1.SMS_SUBSCRIPTION_CHANGED,
    events_1.IN_APP_MESSAGE_WILL_DISPLAY,
    events_1.IN_APP_MESSAGE_WILL_DISMISS,
    events_1.IN_APP_MESSAGE_DID_DISMISS,
    events_1.IN_APP_MESSAGE_DID_DISPLAY,
];
var EventManager = /** @class */ (function () {
    function EventManager(RNOneSignal) {
        this.RNOneSignal = RNOneSignal;
        this.oneSignalEventEmitter = new react_native_1.NativeEventEmitter(RNOneSignal);
        this.eventHandlerMap = new Map(); // used for setters (single replacable callback)
        this.eventHandlerArrayMap = new Map(); // used for adders (multiple callbacks possible)
        this.listeners = {};
        this.setupListeners();
    }
    EventManager.prototype.setupListeners = function () {
        // set up the event emitter and listeners
        if (this.RNOneSignal != null) {
            for (var i = 0; i < eventList.length; i++) {
                var eventName = eventList[i];
                this.listeners[eventName] = this.generateEventListener(eventName);
            }
        }
    };
    // clear handlers
    EventManager.prototype.clearHandlers = function () {
        this.eventHandlerMap = new Map();
        this.eventHandlerArrayMap = new Map();
    };
    /**
     * Sets the event handler on the JS side of the bridge
     * Supports only one handler at a time
     * @param  {string} eventName
     * @param  {function} handler
     * @returns void
     */
    EventManager.prototype.setEventHandler = function (eventName, handler) {
        this.eventHandlerMap.set(eventName, handler);
    };
    /**
     * Adds the event handler to the corresponding handler array on the JS side of the bridge
     * @param  {string} eventName
     * @param  {function} handler
     * @returns void
     */
    EventManager.prototype.addEventHandler = function (eventName, handler) {
        var handlerArray = this.eventHandlerArrayMap.get(eventName);
        handlerArray && handlerArray.length > 0
            ? handlerArray.push(handler)
            : this.eventHandlerArrayMap.set(eventName, [handler]);
    };
    /**
     * clears the event handler(s) for the event name
     * @param  {string} eventName
     * @returns void
     */
    EventManager.prototype.clearEventHandler = function (eventName) {
        this.eventHandlerArrayMap.delete(eventName);
    };
    // returns an event listener with the js to native mapping
    EventManager.prototype.generateEventListener = function (eventName) {
        var _this = this;
        var addListenerCallback = function (payload) {
            if (helpers_1.isMultipleInstancesPossible(eventName)) {
                // used for adders
                var handlerArray = _this.eventHandlerArrayMap.get(eventName);
                if (handlerArray) {
                    handlerArray.forEach(function (handler) {
                        handler(payload);
                    });
                }
            }
            else {
                // used for setters
                var handler = _this.eventHandlerMap.get(eventName);
                payload = _this.getFinalPayload(eventName, payload);
                // Check if we have added listener for this type yet
                if (handler) {
                    handler(payload);
                }
            }
        };
        return this.oneSignalEventEmitter.addListener(eventName, addListenerCallback);
    };
    EventManager.prototype.getFinalPayload = function (eventName, payload) {
        switch (eventName) {
            case events_1.NOTIFICATION_WILL_SHOW:
                return new NotificationReceivedEvent_1.default(payload);
            default:
                return payload;
        }
    };
    return EventManager;
}());
exports.default = EventManager;
