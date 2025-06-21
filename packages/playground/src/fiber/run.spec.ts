import { describe, it, expect } from 'vitest';
import { assertType } from '@w5s/core-type';
import { run } from './run.js';

describe(run, () => {
  const createTracer = () => {
    const stack: string[] = [];

    return Object.assign(
      (name: string) => {
        stack.push(name);
        return name;
      },
      {
        stack,
      },
    );
  };

  it('should run a generator function', async () => {
    const trace = createTracer();

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
    expect(trace.stack).toEqual(['a1', 'b1', 'a2', 'b2', 'a3', 'b3']);

    assertType<typeof fiberA.promise, Promise<'resultA'>>(true);
    assertType<typeof fiberB.promise, Promise<'resultB'>>(true);
  });

  it('handles thrown errors', async () => {
    const trace = createTracer();

    const fiberA = run(function* fibA() {
      throw new Error('TestError');
      yield trace('a1');
      return 'resultA';
    });
    const fiberB = run(function* fibB() {
      yield trace('b1');
      return 'resultB';
    });

    await expect(fiberA.promise).rejects.toEqual(new Error('TestError'));
    await expect(fiberB.promise).resolves.toBe('resultB');
    expect(trace.stack).toEqual(['b1']);
  });
});
