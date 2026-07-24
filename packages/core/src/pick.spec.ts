import { describe, expect, it } from 'vitest';

import { pick } from './pick.js';

describe(pick, () => {
  it('returns a new object without specified keys', async () => {
    const original = { bar: true, baz: true, foo: true };
    const picked = pick(original, ['foo']);

    expect(picked).toEqual({ foo: true });
    expect(original).toEqual({ bar: true, baz: true, foo: true });
  });

  it('handles multiple keys', async () => {
    const original = { a: 1, b: 2, c: 3 };
    const picked = pick(original, ['a', 'b']);

    expect(picked).toEqual({ a: 1, b: 2 });
    expect(original).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('handles symbol keys', async () => {
    const $symbol = Symbol('test');
    const original = { [$symbol]: 2, a: 1 };
    const picked = pick(original, [$symbol]);

    expect(picked).toEqual({ [$symbol]: 2 });
    expect(original).toEqual({ [$symbol]: 2, a: 1 });
  });

  it("handles keys that don't exist in the object", async () => {
    const original = { foo: true };
    // @ts-expect-error - should not compile
    const picked = pick(original, ['bar']);

    expect(picked).toEqual({});
    expect(original).toEqual({ foo: true });
  });

  it('handles empty key arrays', async () => {
    const original = { foo: true };
    const picked = pick(original, []);

    expect(picked).toEqual({});
    expect(original).toEqual({ foo: true });
  });

  it('handles empty key arrays correctly', async () => {
    const original = { foo: true };
    const picked = pick(original, []);

    expect(picked).toEqual({});
    expect(original).toEqual({ foo: true });
  });

  describe('Edge Cases', () => {
    it('should handle cases where keys are undefined', async () => {
      const original = { foo: true, undefined: true };
      // @ts-expect-error - should not compile
      const picked = pick(original, [undefined]);

      expect(picked).toEqual({});
      expect(original).toEqual({ foo: true, undefined: true });
    });

    it('should handle cases where keys are null', async () => {
      const original = { foo: true, null: true };
      // @ts-expect-error - should not compile
      const picked = pick(original, [null]);

      expect(picked).toEqual({});
      expect(original).toEqual({ foo: true, null: true });
    });
  });
});
