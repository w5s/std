import { Enum } from '@w5s/core/dist/Enum.js';

/**
 * Byte size formats
 */
export const ByteSizeFormat = Enum.define({
  typeName: 'ByteSizeFormat' as const,

  IEC: 'IEC',
  SI: 'SI',
});
export type ByteSizeFormat = Enum.ValueOf<typeof ByteSizeFormat>;
