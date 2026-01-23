import { lazy } from '@w5s/core/dist/lazy.js';
import type { ByteSizeStandard } from '../ByteSizeStandard.js';

export const byteSizePrefixes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'] as const;

export const byteSizeStandardData: Record<ByteSizeStandard, { base: number; suffix: string }> = {
  IEC: { base: 1024, suffix: 'iB' },
  SI: { base: 1000, suffix: 'B' },
};

export const byteSizeStandardIndex = lazy(() => {
  const indexMap: Record<string, number> = {};
  for (const value of Object.values(byteSizeStandardData)) {
    Object.assign(
      indexMap,
      Object.fromEntries(byteSizePrefixes.map((prefix, index) => [`${prefix}${value.suffix}`, value.base ** index])),
    );
  }
  return indexMap;
});
