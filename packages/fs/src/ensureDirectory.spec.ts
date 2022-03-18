import { Result } from '@w5s/core';
import { ensureDirectory, ensureDirectorySync } from './ensureDirectory';
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
describe(ensureDirectorySync, () => {
  test(
    'should work for existing and non existing files',
    withTmpDirectory(async ({ path }) => {
      const testDir = path('test');

      expectTask(ensureDirectorySync(testDir)).result.toEqual(Result.Ok(undefined));
      await expectFile(testDir).toExist();
    })
  );
});
