import type { ByteSize } from './ByteSize.js';
import type { ByteSizeStandard } from '../ByteSizeStandard.js';
import { byteSizePrefixes, byteSizeStandardData } from '../ByteSizeStandard/data.js';
import { defaultStandard } from './defaultStandard.js';

export interface FormatOptions {
  /**
   * The standard to use for formatting.
   *
   * - `IEC`: Uses base 1024 (e.g., KiB, MiB).
   * - `SI`: Uses base 1000 (e.g., KB, MB).
   *
   * @default 'SI'
   */
  standard?: ByteSizeStandard;
}

/**
 * Formats a ByteSize into a human-readable string.
 *
 * @example
 * ```typescript
 * format(ByteSize(1234)); // '1,234.00 MB'
 * format(ByteSize(1234), { standard: 'IEC' }); // '1,234.00 KiB'
 * ```
 * @param self
 */
export function format(self: ByteSize, options: FormatOptions = {}): string {
  const { standard = defaultStandard } = options;
  const { base, suffix } = byteSizeStandardData[standard];

  let size = self as number;
  let unitIndex = 0;

  while (size >= base && unitIndex < byteSizePrefixes.length - 1) {
    size /= base;
    unitIndex += 1;
  }

  return `${size} ${byteSizePrefixes[unitIndex]}${suffix}`;
}
