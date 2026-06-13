import { Enum } from '@w5s/core/Enum';

/**
 * Byte size formats
 */
export const ByteSizeFormat = Enum.define({
  typeName: 'ByteSizeFormat' as const,

  IEC: 'IEC',
  SI: 'SI',
});
export type ByteSizeFormat = Enum.ValueOf<typeof ByteSizeFormat>;
