import { describe, it, expect } from 'vitest';
import { assertType } from '@w5s/core-type';
import { run } from './run.js';

describe(run, () => {
  it('should run a generator function', async () => {
    const stack: string[] = [];
    const trace = (name: string) => {
      stack.push(name);
      return name;
    };

    const fiberA = run(function* fibA() {
      yield trace('a1');
      yield trace('a2');
      yield trace('a3');
      return 'resultA' as const;
    });
    const fiberB = run(function* fibB() {
      yield trace('b1');
      yield trace('b2');
      yield trace('b3');
      return 'resultB' as const;
    });

    await expect(fiberA.promise).resolves.toBe('resultA');
    await expect(fiberB.promise).resolves.toBe('resultB');
    expect(stack).toEqual(['a1', 'b1', 'a2', 'b2', 'a3', 'b3']);

    assertType<typeof fiberA.promise, Promise<'resultA'>>(true);
    assertType<typeof fiberB.promise, Promise<'resultB'>>(true);
  });
});
