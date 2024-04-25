import { describe, it, expect } from 'vitest';
import { Tag } from './Tag.js';
import { describeType } from './testing.js';
import { Codec, DecodeError } from './Codec.js';
import { Result } from './Result.js';

describe('Tag', () => {
  type PositiveNumber = number & Tag<'Positive'>;
  const PositiveNumber = Tag.define<number, PositiveNumber>({
    typeName: 'PositiveNumber',
    hasInstance: (value) => typeof value === 'number' && value > 0,
  });

  it('Tag<"...">', () => {
    expect(true).toBe(true);

    const isPositive = (num: number): num is PositiveNumber => num > 0;
    const squareRoot = (num: PositiveNumber): PositiveNumber => Math.sqrt(num) as PositiveNumber;
    const value = 0;
    // @ts-expect-error square root does not accept any number
    squareRoot(value); // tsc: Error
    if (isPositive(value)) {
      squareRoot(value); // tsc: Passed
    }
  });
  describe('define', () => {
    describeType({ describe, it, expect })(PositiveNumber, {
      typeName: 'PositiveNumber',
      instances: () => [1, 1000],
      notInstances: () => [0, -1, -1000],
    });
    describe('#()', () => {
      it('returns identity', () => {
        expect(PositiveNumber(1)).toBe(1);
        expect(() => {
          // @ts-expect-error Throw a type error
          PositiveNumber('');
        }).toThrow(new Error('Invalid PositiveNumber'));
      });
    });
    describe('#wrap', () => {
      it('returns identity', () => {
        expect(PositiveNumber.wrap(1)).toBe(1);
        expect(() => {
          // @ts-expect-error Throw a type error
          PositiveNumber.wrap('');
        }).toThrow(new Error('Invalid PositiveNumber'));
      });
    });
    describe('#unwrap', () => {
      it('returns identity', () => {
        const value = 1 as PositiveNumber;
        expect(PositiveNumber.unwrap(value)).toBe(1);
        // @ts-expect-error Throw a type error
        PositiveNumber.unwrap('');
      });
    });
    describe('#codecEncode', () => {
      it('returns identity', () => {
        expect(Codec.encode(PositiveNumber, 1 as PositiveNumber)).toEqual(1);
      });
    });
    describe('#codecDecode', () => {
      it('returns a decoded value', () => {
        expect(Codec.decode(PositiveNumber, 1)).toEqual(Result.Ok(1));
        expect(Codec.decode(PositiveNumber, 'invalid_value')).toEqual(
          Result.Error(DecodeError({ message: 'Invalid PositiveNumber', input: 'invalid' }))
        );
        expect(Codec.decode(PositiveNumber, undefined)).toEqual(
          Result.Error(DecodeError({ message: 'Invalid PositiveNumber', input: undefined }))
        );
      });
    });
    describe('#codecSchema', () => {
      it('returns the schema', () => {
        expect(Codec.schema(PositiveNumber)).toEqual({});
      });
      it('is overridable', () => {
        const PositiveNumberWithSchema = Tag.define<number, PositiveNumber>({
          typeName: 'PositiveNumber',
          hasInstance: (value) => typeof value === 'number' && value > 0,
          codecSchema: () => ({
            type: 'number',
          }),
        });
        expect(Codec.schema(PositiveNumberWithSchema)).toEqual({ type: 'number' });
      });
    });
  });
});