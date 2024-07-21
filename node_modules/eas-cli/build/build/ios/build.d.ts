import { Platform } from '@expo/eas-build-job';
import { BuildRequestSender } from '../build';
import { BuildContext, CommonContext, IosBuildContext } from '../context';
export declare function createIosContextAsync(ctx: CommonContext<Platform.IOS>): Promise<IosBuildContext>;
export declare function prepareIosBuildAsync(ctx: BuildContext<Platform.IOS>): Promise<BuildRequestSender>;
