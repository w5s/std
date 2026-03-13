import type { StateKey } from './StateKey.js';

/**
 * Application state generic type
 */
export interface State extends Readonly<Record<StateKey, unknown>> {}
