import type { Option } from '@w5s/core';
import type { ByteSize } from './ByteSize.js';

const UNITS: { [key: string]: number } = {
  B: 1,
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4,
  PB: 1024 ** 5,
  EB: 1024 ** 6,
  ZB: 1024 ** 7,
  YB: 1024 ** 8,
};

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
  const regex = /^([\d,.]+)\s*(b|kb|mb|gb|tb|pb|eb|zb|yb)?$/i;
  const match = value.trim().match(regex);

  if (match == null) return undefined;

  const [, amountStr, unit] = match;
  if (amountStr == null) return undefined;
  const amount = Number.parseFloat(amountStr.replaceAll(',', ''));

  if (Number.isNaN(amount)) return undefined;

  const multiplier = unit == null ? 1 : UNITS[unit.toUpperCase()];
  if (multiplier == null) return undefined;

  return (amount * multiplier) as ByteSize;
}
