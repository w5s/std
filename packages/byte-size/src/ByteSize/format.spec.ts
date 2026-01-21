import { describe, expect, it } from 'vitest';
import { format } from './format.js';
import { ByteSize } from './ByteSize.js';

describe(format, () => {
  describe('IEC', () => {
    it('should format file sizes correctly', () => {
      expect(format(ByteSize(1024), { standard: 'IEC' })).toBe('1 KiB');
      expect(format(ByteSize(1_048_576), { standard: 'IEC' })).toBe('1 MiB');
    });
  });
  describe('SI', () => {
    it('should format file sizes correctly', () => {
      expect(format(ByteSize(1000), { standard: 'SI' })).toBe('1 KB');
      expect(format(ByteSize(1_000_000), { standard: 'SI' })).toBe('1 MB');
    });
  });
});
