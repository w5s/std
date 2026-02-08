import { Callable } from '@w5s/core/dist/Callable.js';
import { IntIntegral } from '@w5s/num/dist/Int/IntIntegral.js';
import type { Integral } from '@w5s/core/dist/Numeric/Integral.js';
import { ByteSize as ByteSizeType } from './ByteSize/ByteSize.js';
import { format } from './ByteSize/format.js';
import { parse } from './ByteSize/parse.js';

export type ByteSize = ByteSizeType;

/**
 * @namespace
 */
export const ByteSize = Callable({
  ...ByteSizeType,
  ...(IntIntegral as unknown as Integral<ByteSize>),
  format,
  parse,
});
