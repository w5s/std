import { lazy } from '@w5s/core/dist/lazy.js';
import type { ByteSizeStandard } from '../ByteSizeStandard.js';

export const byteSizeStandardData: Record<ByteSizeStandard, { base: number; units: string[] }> = {
  IEC: { base: 1024, units: ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'] },
  SI: { base: 1000, units: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] },
};

export const byteSizeStandardIndex = lazy(() => {
  const indexMap: Record<string, number> = {};
  for (const value of Object.values(byteSizeStandardData)) {
    Object.assign(indexMap, Object.fromEntries(value.units.map((unit, index) => [unit, value.base ** index])));
  }
  return indexMap;
});
