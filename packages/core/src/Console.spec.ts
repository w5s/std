/* eslint-disable no-console */
import { describe, it, expect, vi } from 'vitest';
import { Console } from './Console.js';
import { unsafeRun } from './Task/unsafeRun.js';

describe('Console', () => {
  const doNothing = () => undefined;

  describe.each([
    [Console.log, 'log'],
    [Console.debug, 'debug'],
    [Console.info, 'info'],
    [Console.warn, 'warn'],
    [Console.error, 'error'],
  ] as [typeof Console.log, 'log' | 'warn' | 'info' | 'error'][])('%p', (task, consoleProperty) => {
    it(`should call console.${consoleProperty}`, async () => {
      vi.spyOn(console, consoleProperty).mockImplementation(doNothing);
      await unsafeRun(task('a', 'b'));
      expect(console[consoleProperty]).toHaveBeenLastCalledWith('a', 'b');
    });
  });
});
