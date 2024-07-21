/// <reference types="react" />
export interface RNSentryOnDrawNextFrameEvent {
    newFrameTimestampInSeconds: number;
    type: 'initialDisplay' | 'fullDisplay';
}
export interface RNSentryOnDrawReporterProps {
    children?: React.ReactNode;
    onDrawNextFrame: (event: {
        nativeEvent: RNSentryOnDrawNextFrameEvent;
    }) => void;
    initialDisplay?: boolean;
    fullDisplay?: boolean;
}
//# sourceMappingURL=timetodisplaynative.types.d.ts.map