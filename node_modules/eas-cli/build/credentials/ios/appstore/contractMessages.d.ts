/// <reference types="@expo/apple-utils/ts-declarations/expo__app-store" />
import { ITCAgreements, RequestContext } from '@expo/apple-utils';
import type { Ora } from '../../../ora';
export declare function formatContractMessage(message: ITCAgreements.ITCContractMessage): string;
/**
 * **Does not support App Store Connect API (CI).**
 */
export declare function assertContractMessagesAsync(context: RequestContext, spinner?: Ora): Promise<void>;
