import { Analytics, AnalyticsEvent, AnalyticsEventProperties } from './AnalyticsManager';
export declare function withAnalyticsAsync<Result>(analytics: Analytics, fn: () => Promise<Result>, { attemptEvent, successEvent, failureEvent, properties, }: {
    attemptEvent: AnalyticsEvent;
    successEvent: AnalyticsEvent;
    failureEvent: AnalyticsEvent;
    properties: AnalyticsEventProperties;
}): Promise<Result>;
