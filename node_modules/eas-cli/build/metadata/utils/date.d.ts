/**
 * Remove time precision from a date to avoid potential errors with the App Store.
 *
 * "status": "409",
 * "code": "ENTITY_ERROR.ATTRIBUTE.INVALID",
 * "title": "An attribute value is invalid.",
 * "detail": "The attribute 'earliestReleaseDate' only allows hour precision",
 * "source": {
 *   "pointer": "/data/attributes/earliestReleaseDate"
 * }
 */
export declare function removeDatePrecision(date: null | undefined | string | number | Date): null | Date;
