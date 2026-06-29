import type { Option } from '@w5s/core';
import type { ByteSize } from './ByteSize.js';
import { byteSizeFormatIndex } from '../ByteSizeFormat/data.js';

const __byteSizeRegex = /^([\d,.]+)\s*([a-z]+)?$/i;

/**
 * Parses a human-readable file size string into a ByteSize.
 *
 * @example
 * ```typescript
 * parse('1,024 KB'); // Option.Some(ByteSize(1048576))
 * parse('21 MB'); // Option.Some(ByteSize(22020096))
 * parse('invalid'); // Option.None
 * ```
 * @param value
 */
export function parse(value: string): Option<ByteSize> {
  const match = value.trim().match(__byteSizeRegex);

  if (match == null) return undefined;

  const [, amountStr, unit] = match;
  if (amountStr == null) return undefined;
  const amount = Number(amountStr.replaceAll(',', ''));

  if (Number.isNaN(amount)) return undefined;
  const multiplier = unit == null ? 1 : byteSizeFormatIndex()[unit];
  if (multiplier == null) return undefined;

  return (amount * multiplier) as ByteSize;
}
