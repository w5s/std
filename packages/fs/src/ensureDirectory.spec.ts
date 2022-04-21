import { Result } from '@w5s/core';
import { ensureDirectory } from './ensureDirectory';
import { expectFile, expectTask, withTmpDirectory } from './_test/config.js';

describe(ensureDirectory, () => {
  test(
    'should work for existing and non existing files',
    withTmpDirectory(async ({ path }) => {
      const testDir = path('test');

      await expectTask(ensureDirectory(testDir)).resolves.toEqual(Result.Ok(undefined));
      await expectFile(testDir).toExist();
    })
  );
});
