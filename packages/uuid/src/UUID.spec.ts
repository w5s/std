import { describe, it, expect } from 'vitest';
import { UUID as UUIDType } from '@w5s/core/dist/Type/UUID.js';
import { UUIDApplication } from './UUID/UUIDApplication.js';
import { UUID } from './UUID.js';
import { empty } from './UUID/empty.js';
import { of } from './UUID/of.js';

describe('UUID', () => {
  it('is an alias to functions', () => {
    expect(UUID).toEqual(expect.objectContaining(UUIDApplication));
    expect(UUID).toEqual(expect.objectContaining({ ...UUIDType }));
    expect(UUID).toEqual(
      expect.objectContaining({
        empty,
        of,
      }),
    );
  });
});
