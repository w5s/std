import { Result } from '@w5s/core';
import { Process } from './process';
import { expectTask } from './_test/config';

describe(Process.exit, () => {
  test('should call process.exit', () => {
    const processExit = jest.spyOn(Process.__internal__, 'exit').mockImplementation(
      () =>
        // do nothing
        undefined as never
    );
    const exitTask = Process.exit(0);
    expectTask(exitTask).result.toEqual(Result.Ok(undefined));
    expect(processExit).toHaveBeenCalledWith(0);
  });
});
