import EasCommand from '../commandUtils/EasCommand';
export default class AnalyticsView extends EasCommand {
    static description: string;
    static args: {
        name: string;
        options: string[];
    }[];
    runAsync(): Promise<void>;
}
