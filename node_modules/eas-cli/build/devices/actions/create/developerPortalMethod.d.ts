/// <reference types="@expo/apple-utils/ts-declarations/expo__app-store" />
import { Device } from '@expo/apple-utils';
import { ExpoGraphqlClient } from '../../../commandUtils/context/contextUtils/createGraphqlClient';
import AppStoreApi from '../../../credentials/ios/appstore/AppStoreApi';
import { AccountFragment, AppleTeam } from '../../../graphql/generated';
export declare function runDeveloperPortalMethodAsync(graphqlClient: ExpoGraphqlClient, appStoreApi: AppStoreApi, account: AccountFragment, appleTeam: Pick<AppleTeam, 'appleTeamIdentifier' | 'appleTeamName' | 'id'>): Promise<void>;
export declare function formatDeviceLabel(device: Device): string;
