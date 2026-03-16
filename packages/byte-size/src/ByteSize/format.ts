import type { ByteSize } from './ByteSize.js';
import type { ByteSizeFormat } from '../ByteSizeFormat.js';
import { byteSizePrefixes, byteSizeFormatData } from '../ByteSizeFormat/data.js';
import { defaultFormat } from './defaultFormat.js';

export interface FormatOptions {
  /**
   * The standard to use for formatting.
   *
   * - `IEC`: Uses base 1024 (e.g., KiB, MiB).
   * - `SI`: Uses base 1000 (e.g., KB, MB).
   *
   * @default 'SI'
   */
  standard?: ByteSizeFormat;
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
 * @param options
 */
export function format(self: ByteSize, options: FormatOptions = {}): string {
  const { standard = defaultFormat } = options;
  const { base, suffix } = byteSizeFormatData[standard];

  let size = self as number;
  let unitIndex = 0;

  while (size >= base && unitIndex < byteSizePrefixes.length - 1) {
    size /= base;
    unitIndex += 1;
  }

  return `${size} ${byteSizePrefixes[unitIndex]}${suffix}`;
}
