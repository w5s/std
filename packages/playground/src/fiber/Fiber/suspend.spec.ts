/* eslint-disable ts/no-use-before-define */
import { describe, expect, it } from 'vitest';

import { resume } from './resume.js';
import { run } from './run.js';
import { suspend } from './suspend.js';

describe(suspend, () => {
  it('should run a generator function', async () => {
    const stack: Array<string> = [];
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
