import { Result } from '@w5s/core';
import { ensureDirectory } from './ensure';
import { expectFile, expectTask, withTmpDirectory } from './_test/config.js';

describe(ensureDirectory, () => {
  test(
    'should work for existing and non existing files',
    withTmpDirectory(async ({ filePath }) => {
      const ensuredDir = filePath('test');

      await expectTask(ensureDirectory(ensuredDir)).resolves.toEqual(Result.Ok(undefined));
      await expectFile(ensuredDir).toExist();
    })
  );
});
