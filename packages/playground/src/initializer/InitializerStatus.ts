import type { ValueOf } from '@w5s/core-type';

/**
 * Initializer status
 */
export const InitializerStatus = {
  Stopped: 'stopped',
  Starting: 'starting',
  Ready: 'ready',
  Crashed: 'crashed',
} as const;
export type InitializerStatus = ValueOf<typeof InitializerStatus>;
