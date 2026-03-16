import { lazy } from '@w5s/core/dist/lazy.js';
import type { ByteSizeFormat } from '../ByteSizeFormat.js';

export const byteSizePrefixes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'] as const;

export const byteSizeFormatData: Record<ByteSizeFormat, { base: number; suffix: string }> = {
  IEC: { base: 1024, suffix: 'iB' },
  SI: { base: 1000, suffix: 'B' },
};

export const byteSizeFormatIndex = lazy(() => {
  const indexMap: Record<string, number> = {};
  for (const value of Object.values(byteSizeFormatData)) {
    Object.assign(
      indexMap,
      Object.fromEntries(byteSizePrefixes.map((prefix, index) => [`${prefix}${value.suffix}`, value.base ** index])),
    );
  }
  return indexMap;
});
