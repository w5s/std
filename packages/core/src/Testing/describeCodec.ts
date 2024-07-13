import { Codec } from '../Codec.js';
import type { Result } from '../Result.js';
import type { TestingLibrary } from './type.js';

export function describeCodec(testingLibrary: TestingLibrary) {
  const { describe, it, expect } = testingLibrary;
  return <T>(
    subject: Codec<T>,
    properties: {
      decode: Array<[unknown, Result<unknown, unknown>]>;
      encode: Array<[T, unknown]>;
      schema: () => unknown;
    }
  ) => {
    (properties.decode.length === 0 ? describe.todo : describe)('codecDecode', () => {
      it.each(properties.decode.map(([input, expected]) => ({ input, expected })))(
        '($input) == $expected',
        ({ input, expected }) => {
          expect(Codec.decode(subject, input)).toEqual(expected);
        }
      );
    });
    (properties.encode.length === 0 ? describe.todo : describe)('codecEncode', () => {
      it.each(properties.encode.map(([input, expected]) => ({ input, expected })))(
        '($input) == $expected',
        ({ input, expected }) => {
          expect(Codec.encode(subject, input)).toEqual(expected);
        }
      );
    });
    describe('codecSchema', () => {
      it('should be a valid JSON schema', () => {
        expect(Codec.schema(subject)).toEqual(properties.schema());
      });
    });
  };
}
