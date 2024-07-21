import EasCommand from '../../commandUtils/EasCommand';
export default class BranchPublish extends EasCommand {
    static description: string;
    static hidden: boolean;
    runAsync(): Promise<void>;
}
