import { describe, it, expect } from 'vitest';
import { run } from './run.js';
import { terminate } from './terminate.js';

describe(terminate, () => {
  it('should run a generator function', async () => {
    const stack: string[] = [];
    const trace = (name: string) => {
      stack.push(name);
      return name;
    };
    const terminated = Promise.withResolvers();

    const fiberA = run(function* fibA() {
      yield trace('a1');
      terminate(fiberA);
      // Use a long enough timer to make sure expect can be called
      setTimeout(() => {
        terminated.resolve(undefined);
      }, 50);

      yield trace('a2');
      yield trace('a3');
      return 'resultA';
    });

    await terminated.promise;
    expect(stack).toEqual(['a1', 'a2']);
  });
});
