import { describe, expect, it } from 'vitest';
import { useStorage } from './useStorage.js';
import { $storage } from './$storage.js';

describe(useStorage, () => {
  it('should be a map', () => {
    const storage = useStorage({});

    expect(storage).toBeInstanceOf(Map);
  });
  it('should attached to host[$storage]', () => {
    const host = {};
    const storage = useStorage(host);
    expect(host).toEqual(
      expect.objectContaining({
        [$storage]: storage,
      }),
    );
  });
});
