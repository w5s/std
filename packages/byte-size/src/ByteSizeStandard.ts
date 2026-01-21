import { Enum } from '@w5s/core/dist/Enum.js';

/**
 * Byte size standards
 */
export const ByteSizeStandard = Enum.define({
  typeName: 'ByteSizeStandard' as const,

  IEC: 'IEC',
  SI: 'SI',
});
export type ByteSizeStandard = Enum.ValueOf<typeof ByteSizeStandard>;
