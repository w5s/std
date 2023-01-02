import { describe, expect, it } from '@jest/globals';
import { globalStorage } from './globalStorage.js';
import { Symbol } from './symbol.js';

describe('globalStorage', () => {
  it('should be a map', () => {
    expect(globalStorage).toBeInstanceOf(Map);
  });
  it('should attached to globalThis[Symbol.globalStorage]', () => {
    expect(globalThis).toEqual(
      expect.objectContaining({
        [Symbol.globalStorage]: globalStorage,
      })
    );
  });
});
