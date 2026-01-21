import type { Bounded } from '@w5s/core';
import type { ByteSize } from './ByteSize.js';

export const ByteSizeBounded: Bounded<ByteSize> = {
  maxValue: Number.MAX_SAFE_INTEGER as ByteSize,
  minValue: Number.MIN_SAFE_INTEGER as ByteSize,
};
