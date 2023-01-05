import { describe, expect, it } from '@jest/globals';
import { globalStorage, GlobalStorage } from './globalStorage.js';
import { Symbol } from './symbol.js';

describe(GlobalStorage, () => {
  describe('#get', () => {
    it('should return an array of pair', () => {
      const storage = new GlobalStorage();
      expect(storage.get('foo')).toBe(undefined);
      storage.set('foo', true);
      expect(storage.get('foo')).toBe(true);
    });
  });
});
describe('globalStorage', () => {
  it('should be a map', () => {
    expect(globalStorage).toBeInstanceOf(Map);
    expect(globalStorage).toBeInstanceOf(GlobalStorage);
  });
  it('should attached to globalThis[Symbol.globalStorage]', () => {
    expect(globalThis).toEqual(
      expect.objectContaining({
        [Symbol.globalStorage]: globalStorage,
      })
    );
  });
});
