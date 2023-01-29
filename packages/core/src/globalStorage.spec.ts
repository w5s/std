import { describe, expect, it } from '@jest/globals';
import { globalStorage, GlobalStorage, useRef } from './globalStorage.js';
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
describe('useRef()', () => {
  it('should initialize with initial value', () => {
    const ref = useRef('some_test_ref', 0);
    expect(ref.current).toBe(0);
    expect(globalStorage.get('some_test_ref')).toBe(0);
  });
  it('should implement set', () => {
    const ref = useRef('some_test_ref', 0);
    ref.current += 1;
    expect(ref.current).toBe(1);
    expect(globalStorage.get('some_test_ref')).toBe(1);
  });
});
