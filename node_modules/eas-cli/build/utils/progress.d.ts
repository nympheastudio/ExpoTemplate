export type Progress = {
    total: number;
    percent: number;
    transferred: number;
};
export type ProgressHandler = (props: {
    progress?: Progress;
    isComplete?: boolean;
    error?: Error;
}) => void;
export declare function createProgressTracker({ total, message, completedMessage, }: {
    total?: number;
    message: string | ((ratio: number, total: number) => string);
    completedMessage: string | ((duration: string) => string);
}): ProgressHandler;
