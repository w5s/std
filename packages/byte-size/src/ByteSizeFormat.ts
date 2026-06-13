import { Enum } from '@w5s/core/Enum';

/**
 * Byte size formats
 */
export const ByteSizeFormat = Enum.define({
  IEC: 'IEC',

  SI: 'SI',
  typeName: 'ByteSizeFormat' as const,
});
export type ByteSizeFormat = Enum.ValueOf<typeof ByteSizeFormat>;
