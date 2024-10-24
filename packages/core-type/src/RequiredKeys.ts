import type { Pretty } from './Pretty.js';

/**
 * Make specified `Keys` properties in `T` required
 *
 * @example
 * ```ts
 * type T = { foo?: boolean, bar?: string }
 * type RequiredT = RequiredKeys<T, 'bar'>; // { foo?: boolean; bar: string };
 * ```
 */
export type RequiredKeys<T, Keys extends keyof T> = Pretty<
  // Forward all other keys
  Omit<T, Keys> &
    // Make required only specified keys
    Required<Pick<T, Keys>>
>;
