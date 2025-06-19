/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/**
 * A type representing non primitive values. This includes :
 * - symbol
 * - object (null is excluded)
 * - function
 */
export type ObjectLike = symbol | object | Function;
