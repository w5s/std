/* eslint-disable no-console */
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
  ] as const)('%p', (task, consoleProperty) => {
    test(`should call console.${consoleProperty}`, () => {
      jest.spyOn(console, consoleProperty).mockImplementation(doNothing);
      Task.unsafeRun(task('a', 'b'));
      expect(console[consoleProperty]).toHaveBeenLastCalledWith('a', 'b');
    });
  });
});
