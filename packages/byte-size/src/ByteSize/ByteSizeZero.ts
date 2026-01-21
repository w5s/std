import type { Numeric } from '@w5s/core';
import type { ByteSize } from '../ByteSize.js';

export const ByteSizeZero: Numeric.Zero<ByteSize> = {
  zero: () => 0 as ByteSize,
  isZero: (self) => self === 0,
};
