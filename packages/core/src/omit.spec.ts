import { describe, it, expect } from 'vitest';
import { omit } from './omit.js';

describe(omit, () => {
  it('returns a new object without specified keys', async () => {
    const original = { foo: true, bar: true, baz: true };
    const omitted = omit(original, ['foo']);

    expect(omitted).toEqual({ bar: true, baz: true });
    expect(original).toEqual({ foo: true, bar: true, baz: true });
  });

  it('handles multiple keys', async () => {
    const original = { a: 1, b: 2, c: 3 };
    const omitted = omit(original, ['a', 'b']);

    expect(omitted).toEqual({ c: 3 });
    expect(original).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('handles symbol keys', async () => {
    const $symbol = Symbol('test');
    const original = { a: 1, [$symbol]: 2 };
    const omitted = omit(original, [$symbol]);

    expect(omitted).toEqual({ a: 1 });
    expect(original).toEqual({ a: 1, [$symbol]: 2 });
  });

  it("handles keys that don't exist in the object", async () => {
    const original = { foo: true };
    // @ts-expect-error - should not compile
    const omitted = omit(original, ['bar']);

    expect(omitted).toEqual({ foo: true });
    expect(original).toEqual({ foo: true });
  });

  it('handles partial keys by excluding all of them', async () => {
    const original = { a: 1, b: 2 };
    const omitted = omit(original, ['a']);

    expect(omitted).toEqual({ b: 2 });
    expect(original).toEqual({ a: 1, b: 2 });
  });

  it('handles empty key arrays correctly', async () => {
    const original = { foo: true };
    const omitted = omit(original, []);

    expect(omitted).toEqual({ foo: true });
    expect(original).toEqual({ foo: true });
  });

  describe('Type safety', () => {
    it('enforces type constraints on the self parameter', async () => {
      // @ts-expect-error - should not compile
      omit('not an object', ['foo']);
    });
  });

  describe('Edge Cases', () => {
    it('should handle cases where keys are undefined', async () => {
      const original = { foo: true, undefined: true };
      // @ts-expect-error - should not compile
      const omitted = omit(original, [undefined]);

      expect(omitted).toEqual({ foo: true, undefined: true });
      expect(original).toEqual({ foo: true, undefined: true });
    });

    it('should handle cases where keys are null', async () => {
      const original = { foo: true, null: true };
      // @ts-expect-error - should not compile
      const omitted = omit(original, [null]);

      expect(omitted).toEqual({ foo: true, null: true });
      expect(original).toEqual({ foo: true, null: true });
    });
  });
});
