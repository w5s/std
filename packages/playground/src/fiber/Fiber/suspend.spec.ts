/* eslint-disable @typescript-eslint/no-use-before-define */
import { describe, it, expect } from 'vitest';
import { run } from './run.js';
import { suspend } from './suspend.js';
import { resume } from './resume.js';

describe(suspend, () => {
  it('should run a generator function', async () => {
    const stack: string[] = [];
    const trace = (name: string) => {
      stack.push(name);
      return name;
    };

    const fiberA = run(function* fibA() {
      yield trace('a1');
      suspend(fiberB);
      yield trace('a2');
      yield trace('a3');
      resume(fiberB);
      return 'resultA';
    });
    const fiberB = run(function* fibB() {
      yield trace('b1');
      yield trace('b2');
      yield trace('b3');
      return 'resultB';
    });

    await expect(fiberA.promise).resolves.toBe('resultA');
    await expect(fiberB.promise).resolves.toBe('resultB');
    expect(stack).toEqual(['a1', 'b1', 'a2', 'a3', 'b2', 'b3']);
  });
});
