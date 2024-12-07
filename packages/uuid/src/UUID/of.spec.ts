import { describe, it, expect } from 'vitest';
import { of } from './of.js';
import type { UUID } from '../UUID.js';

describe(of, () => {
  const anyValidUUID = '1c19548b-7cac-4222-b722-dc38f2870669' as UUID;
  it('should return a new representation', () => {
    const uuid = of(anyValidUUID);
    expect(uuid).toEqual(anyValidUUID);
  });
  it.each([undefined, null, [], '', 'non uuid'])('should throw TypeError when invalid value is passed', (value) => {
    expect(() =>
      // @ts-expect-error test it anyway
      of(value),
    ).toThrow();
  });
});
