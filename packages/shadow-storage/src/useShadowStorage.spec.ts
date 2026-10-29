import { describe, expect, it } from 'vitest';

import { $shadowStorage } from './$shadowStorage.js';
import { useShadowStorage } from './useShadowStorage.js';

describe(useShadowStorage, () => {
  it('should be a map', () => {
    const storage = useShadowStorage({});

    expect(storage).toBeInstanceOf(Map);
  });
  it('should attached to host[$shadowStorage]', () => {
    const host = {};
    const storage = useShadowStorage(host);
    expect(host).toEqual(
      expect.objectContaining({
        [$shadowStorage]: storage,
      }),
    );
  });
});
