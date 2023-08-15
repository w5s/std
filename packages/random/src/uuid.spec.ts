import { describe, it, expect } from 'vitest';
import { UUID } from './uuid.js';

describe('UUID', () => {
  const anyValidUUID = '1c19548b-7cac-4222-b722-dc38f2870669';

  describe.each([UUID, UUID.of])('()', (create) => {
    it('should return a new representation', () => {
      const uuid = create(anyValidUUID);
      expect(uuid).toEqual(anyValidUUID);
    });
    it.each([undefined, null, [], '', 'non uuid'])('should throw TypeError when invalid value is passed', (value) => {
      expect(() =>
        // @ts-expect-error test it anyway
        create(value)
      ).toThrow();
    });
  });
  describe('.empty', () => {
    it('should return a 0 based UUID', () => {
      expect(UUID.empty()).toBe('00000000-0000-0000-0000-000000000000');
    });
  });
  describe('.hasInstance', () => {
    it.each([undefined, null, [], '', 'non uuid'])(`should return false for invalid UUID`, (value) => {
      expect(UUID.hasInstance(value)).toBe(false);
    });
    it(`should return true for valid UUID`, () => {
      expect(UUID.hasInstance(anyValidUUID)).toBe(true);
    });
  });
});
