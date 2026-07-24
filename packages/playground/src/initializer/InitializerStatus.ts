import type { ValueOf } from '@w5s/core-type';

/**
 * Initializer status
 */
export const InitializerStatus = {
  Crashed: 'crashed',
  Ready: 'ready',
  Starting: 'starting',
  Stopped: 'stopped',
} as const;
export type InitializerStatus = ValueOf<typeof InitializerStatus>;
