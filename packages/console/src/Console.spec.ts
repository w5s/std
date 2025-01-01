/* eslint-disable no-console */
import { describe, it, expect, vi } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
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
  ] as [typeof Console.log, 'log' | 'warn' | 'info' | 'error'][])('%p', (task, consoleProperty) => {
    it(`should call console.${consoleProperty}`, async () => {
      vi.spyOn(console, consoleProperty).mockImplementation(doNothing);
      expectTask(task('a', 'b')).toResolveSync(undefined);
      expect(console[consoleProperty]).toHaveBeenLastCalledWith('a', 'b');
    });
  });
});
