import { describe, expect, it } from 'vitest';
import { Symbol } from '@w5s/core';
import { useStorage } from './useStorage.js';

describe('useStorage', () => {
  it('should be a map', () => {
    const storage = useStorage({});

    expect(storage).toBeInstanceOf(Map);
  });
  it('should attached to host[Symbol.storage]', () => {
    const host = {};
    const storage = useStorage(host);
    expect(host).toEqual(
      expect.objectContaining({
        [Symbol.storage]: storage,
      })
    );
  });
});
