import { describe, it, expect } from 'vitest';
import { objectId } from './objectId.js';

describe(objectId, () => {
  const isInt = (value: number) => Number.isInteger(value);

  describe.each([
    // Generator
    { type: 'function', generate: (): object => ({ property: Math.random() }) },
    { type: 'symbol', generate: () => Symbol('foo') },
    { type: 'function', generate: () => function foo() {} },
  ])('with $function', ({ generate }) => {
    it('returns an integer value', () => {
      const value = generate();
      const id = objectId(value);
      expect(isInt(id)).toBe(true);
    });
    it('is idempotent', () => {
      const value = generate();
      const id = objectId(value);
      expect(typeof id).toBe('number');
      expect(objectId(value)).toBe(id);
    });
    it('returns a new value for different object', () => {
      const value = generate();
      const otherValue = generate();
      expect(objectId(value)).not.toBe(objectId(otherValue));
    });
  });
});
