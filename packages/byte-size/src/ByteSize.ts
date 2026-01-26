import { Callable } from '@w5s/core';
import { Int } from '@w5s/num';
import { ByteSize as ByteSizeType } from './ByteSize/ByteSize.js';
import { format } from './ByteSize/format.js';
import { parse } from './ByteSize/parse.js';

export type ByteSize = ByteSizeType;

/**
 * @namespace
 */
export const ByteSize = Callable({
  ...ByteSizeType,
  ...Int.Make<ByteSize>(),
  format,
  parse,
});
