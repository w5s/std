import type { ByteSize } from './ByteSize.js';
import type { ByteSizeStandard } from '../ByteSizeStandard.js';

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

const standardSpec: Record<Exclude<FormatOptions['standard'], undefined>, { base: number; units: string[] }> = {
  IEC: { base: 1024, units: ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'] },
  SI: { base: 1000, units: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] },
};

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
  const { standard = 'SI' } = options;
  const { base, units } = standardSpec[standard];

  let size = self as number;
  let unitIndex = 0;

  while (size >= base && unitIndex < units.length - 1) {
    size /= base;
    unitIndex += 1;
  }

  return `${size} ${units[unitIndex]}`;
}
