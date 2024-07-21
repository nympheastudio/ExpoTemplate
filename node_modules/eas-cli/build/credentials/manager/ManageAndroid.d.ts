import { Platform } from '@expo/eas-build-job';
import { BuildProfile } from '@expo/eas-json';
import { ActionInfo, AndroidActionType } from './Actions';
import { Action } from './HelperActions';
import { GradleBuildContext } from '../../project/android/gradle';
import { CredentialsContext } from '../context';
export declare class ManageAndroid {
    protected callingAction: Action;
    protected projectDir: string;
    constructor(callingAction: Action, projectDir: string);
    runAsync(currentActions?: ActionInfo[]): Promise<void>;
    protected createProjectContextAsync(ctx: CredentialsContext, buildProfile: BuildProfile<Platform.ANDROID>): Promise<GradleBuildContext | undefined>;
    protected runProjectSpecificActionAsync(ctx: CredentialsContext, action: AndroidActionType, gradleContext?: GradleBuildContext): Promise<void>;
}
