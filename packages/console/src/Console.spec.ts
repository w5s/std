import { withTask } from '@w5s/task/dist/Testing.js';
import { describe, expect, it, vi } from 'vitest';

import { Console } from './Console.js';

describe('Console', () => {
  const doNothing = () => undefined;
  const expectTask = withTask(expect);

  describe.each([
    [Console.log, 'log'],
    [Console.debug, 'debug'],
    [Console.info, 'info'],
    [Console.warn, 'warn'],
    [Console.error, 'error'],
  ] as Array<[typeof Console.log, 'error' | 'info' | 'log' | 'warn']>)('%p', (task, consoleProperty) => {
    it(`should call console.${consoleProperty}`, async () => {
      vi.spyOn(console, consoleProperty).mockImplementation(doNothing);
      expectTask(task('a', 'b')).toResolveSync(undefined);
      expect(console[consoleProperty]).toHaveBeenLastCalledWith('a', 'b');
    });
  });
});
