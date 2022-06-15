/* eslint-disable no-console */
import { describe, test, expect, jest } from '@jest/globals';
import { Console } from './console.js';
import { Task } from './task.js';

describe('Console', () => {
  const doNothing = () => undefined;

  describe.each([
    [Console.log, 'log'],
    [Console.debug, 'debug'],
    [Console.info, 'info'],
    [Console.warn, 'warn'],
    [Console.error, 'error'],
  ] as [typeof Console.log, 'log' | 'warn' | 'info' | 'error'][])('%p', (task, consoleProperty) => {
    test(`should call console.${consoleProperty}`, async () => {
      jest.spyOn(console, consoleProperty).mockImplementation(doNothing);
      await Task.unsafeRun(task('a', 'b'));
      expect(console[consoleProperty]).toHaveBeenLastCalledWith('a', 'b');
    });
  });
});
