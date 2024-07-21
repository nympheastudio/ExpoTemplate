/// <reference types="@expo/apple-utils/ts-declarations/expo__app-store" />
import { AgeRatingDeclaration, AppInfoLocalization, AppStoreReviewDetail, AppStoreVersion, AppStoreVersionLocalization, AppStoreVersionPhasedRelease, CategoryIds } from '@expo/apple-utils';
import { AttributesOf } from '../../utils/asc';
import { AppleMetadata } from '../types';
type PartialExcept<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;
export declare const DEFAULT_WHATSNEW = "Bug fixes and improved stability";
/**
 * Deserializes the metadata config schema into attributes for different models.
 * This uses version 0 of the config schema.
 */
export declare class AppleConfigReader {
    readonly schema: AppleMetadata;
    constructor(schema: AppleMetadata);
    getAgeRating(): Partial<AttributesOf<AgeRatingDeclaration>> | null;
    getLocales(): string[];
    getInfoLocale(locale: string): PartialExcept<AttributesOf<AppInfoLocalization>, 'locale' | 'name'> | null;
    getCategories(): CategoryIds | null;
    /** Get the `AppStoreVersion` object. */
    getVersion(): Partial<Omit<AttributesOf<AppStoreVersion>, 'releaseType' | 'earliestReleaseDate'>> | null;
    getVersionReleaseType(): Partial<Pick<AttributesOf<AppStoreVersion>, 'releaseType' | 'earliestReleaseDate'>> | null;
    getVersionReleasePhased(): Pick<AttributesOf<AppStoreVersionPhasedRelease>, 'phasedReleaseState'> | null;
    getVersionLocale(locale: string, context: {
        versionIsFirst: boolean;
    }): Partial<AttributesOf<AppStoreVersionLocalization>> | null;
    getReviewDetails(): Partial<AttributesOf<AppStoreReviewDetail>> | null;
}
export {};
