import { Result } from '@w5s/core';
import { describe, it } from '@jest/globals';
import { emptyDirectory } from './emptyDirectory.js';
import { expectDir, expectTask, withTmpDirectory } from '../_test/config.js';

describe('emptyDirectory', () => {
  it(
    'should delete all of the items when not empty',
    withTmpDirectory(async ({ filePath: testDir, createDir, createFile }) => {
      await Promise.all([
        createFile(testDir('some-file')),
        createFile(testDir('some-file-2')),
        createDir(testDir('some-dir')),
      ]);

      await expectDir(testDir()).toHaveLength(3);
      await expectTask(emptyDirectory(testDir())).resolves.toEqual(Result.Ok(undefined));
      await expectDir(testDir()).toHaveLength(0);
    })
  );

  it(
    'should do nothing when empty',
    withTmpDirectory(async ({ filePath: testDir }) => {
      const target = testDir();
      await expectDir(target).toHaveLength(0);
      await expectTask(emptyDirectory(target)).resolves.toEqual(Result.Ok(undefined));
      await expectDir(target).toHaveLength(0);
    })
  );

  it(
    'should create directory when does not exist',
    withTmpDirectory(async ({ filePath: testDir }) => {
      const target = testDir('does-not-exist');
      await expectTask(emptyDirectory(target)).resolves.toEqual(Result.Ok(undefined));
      await expectDir(target).toHaveLength(0);
    })
  );
});
