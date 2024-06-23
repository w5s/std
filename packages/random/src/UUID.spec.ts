import { describe, it, expect } from 'vitest';
import { DecodeError } from '@w5s/core/dist/DecodeError.js';
import { Result } from '@w5s/core';
import { describeCodec, describeType } from '@w5s/core/dist/testing.js';
import { UUID } from './UUID.js';

describe('UUID', () => {
  const anyValidUUID = '1c19548b-7cac-4222-b722-dc38f2870669' as UUID;

  describeType({ describe, it, expect })(UUID, {
    typeName: 'UUID',
    instances: () => [anyValidUUID],
    notInstances: () => [null, anyValidUUID.slice(1)],
  });
  describeCodec({ describe, it, expect })(UUID, {
    decode: [
      [anyValidUUID, Result.Ok(anyValidUUID)],
      [
        null,
        Result.Error(
          DecodeError({
            message: 'Cannot decode null as UUID',
            input: null,
          })
        ),
      ],
    ],
    encode: [[anyValidUUID, anyValidUUID]],
    schema: () => ({
      type: 'string',
      format: 'uuid',
    }),
  });
  describe('of()', () => {
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
  describe('.empty', () => {
    it('should return a 0 based UUID', () => {
      expect(UUID.empty()).toBe('00000000-0000-0000-0000-000000000000');
    });
  });
});
