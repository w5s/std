import { Codec } from '../Codec.js';
import type { Result } from '../Result.js';
import { Symbol } from '../Symbol.js';
import type { TestingLibrary } from './type.js';

/**
 * Create a spec for Codec behavior
 *
 * @example
 * ```typescript
 * describeCodec({ describe, it, expect })(Int, {
 *   decode: [
 *     [1, Result.Ok(Int(1))],
 *     [null, Result.Error(new CodecError({ message: 'Cannot decode null as Int', input: null }))],
 *   ],
 *   encode: [
 *     [Int(0), 0],
 *     [Int(1), 1],
 *   ],
 *   schema: () => ({
 *     type: 'integer',
 *   }),
 * });
 * ```
 * @param testingLibrary
 */
export function describeCodec(testingLibrary: TestingLibrary) {
  const { describe, it, expect } = testingLibrary;
  return <T>(
    subject: Codec<T>,
    properties: {
      decode: Array<[unknown, Result<unknown, unknown>]>;
      encode: Array<[unknown, unknown]>;
      schema: () => unknown;
    },
  ) => {
    (properties.decode.length === 0 ? describe.todo : describe)(Symbol.decode, () => {
      it.each(properties.decode.map(([input, expected]) => ({ input, expected })))(
        '($input) == $expected',
        ({ input, expected }) => {
          expect(Codec.decode(subject, input)).toEqual(expected);
        },
      );
    });
    (properties.encode.length === 0 ? describe.todo : describe)(Symbol.encode, () => {
      it.each(properties.encode.map(([input, expected]) => ({ input, expected })))(
        '($input) == $expected',
        ({ input, expected }) => {
          expect(Codec.encode(subject, input)).toEqual(expected);
        },
      );
    });
    describe(Symbol.schema, () => {
      it('should be a valid JSON schema', () => {
        expect(Codec.schema(subject)).toEqual(properties.schema());
      });
    });
  };
}
