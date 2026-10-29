import { describe, expect, it } from 'vitest';

import { ShadowStorage } from './ShadowStorage.js';

describe('ShadowStorage', () => {
  describe(ShadowStorage.create, () => {
    it('should create a new ShadowStorage instance', () => {
      const storage = ShadowStorage.create();
      expect(storage).toBeInstanceOf(Map);
    });
  });
  describe(ShadowStorage.hasInstance, () => {
    it('should correctly identify ShadowStorage instances', () => {
      expect(ShadowStorage.hasInstance(undefined)).toBe(false);
      expect(ShadowStorage.hasInstance(null)).toBe(false);
      expect(ShadowStorage.hasInstance({})).toBe(false);
      expect(ShadowStorage.hasInstance(new Map())).toBe(true);
    });
  });
});
