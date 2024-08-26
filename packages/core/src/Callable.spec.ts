import { describe, expect, it } from 'vitest';
import { Callable } from './Callable.js';

describe(Callable, () => {
  it('returns a new function', () => {
    const TestCallable = Callable({
      [Callable.symbol]: <T>(value: T) => value,
      foo: true,
    });
    expect(TestCallable(1)).toBe(1);
    expect(TestCallable.foo).toBe(true);
  });
});
