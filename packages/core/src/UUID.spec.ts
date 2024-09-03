import { describe, it, expect } from 'vitest';
import { UUID } from './UUID.js';
import { UUID as UUIDType } from './Type/UUID.js';

describe('UUID', () => {
  const anyValidUUID = '1c19548b-7cac-4222-b722-dc38f2870669' as UUID;

  it('is an alias to functions', () => {
    expect(UUID).toEqual(expect.objectContaining({ ...UUIDType }));
  });
  describe(UUID.of, () => {
    it('should return a new representation', () => {
      const uuid = UUID.of(anyValidUUID);
      expect(uuid).toEqual(anyValidUUID);
    });
    it.each([undefined, null, [], '', 'non uuid'])('should throw TypeError when invalid value is passed', (value) => {
      expect(() =>
        // @ts-expect-error test it anyway
        UUID.of(value)
      ).toThrow();
    });
  });
  describe(UUID.empty, () => {
    it('should return a 0 based UUID', () => {
      expect(UUID.empty()).toBe('00000000-0000-0000-0000-000000000000');
    });
  });
});
