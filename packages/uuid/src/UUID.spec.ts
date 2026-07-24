import { UUID as UUIDType } from '@w5s/core/dist/Type/UUID.js';
import { describe, expect, it } from 'vitest';

import { UUID } from './UUID.js';
import { empty } from './UUID/empty.js';
import { of } from './UUID/of.js';
import { toBigInt } from './UUID/toBigInt.js';
import { toUint32Array } from './UUID/toUint32Array.js';

describe('UUID', () => {
  it('is an alias to functions', () => {
    expect(UUID).toEqual(expect.objectContaining({ ...UUIDType }));
    expect(UUID).toEqual(
      expect.objectContaining({
        empty,
        of,
        toBigInt,
        toUint32Array,
      }),
    );
  });
});
