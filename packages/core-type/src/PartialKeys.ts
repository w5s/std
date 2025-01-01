import type { Pretty } from './Pretty.js';

/**
 * Return a partial type of `T` for keys in `Keys`
 *
 * @example
 * ```typescript
 * type T = { required: boolean; optional1: string; optional2: string; };
 * type OptionalT = PartialKeys<T, 'optional'>; // { required: boolean; optional1?: string; optional2?: string; };
 * ```
 */
export type PartialKeys<T, Keys extends keyof T> = Pretty<Omit<T, Keys> & Partial<Pick<T, Keys>>>;
