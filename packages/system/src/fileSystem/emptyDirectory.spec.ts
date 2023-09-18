import { Result } from '@w5s/core';
import { describe, expect, it } from 'vitest';
import { withFile } from '@w5s/core/dist/testing.js';
import { emptyDirectory } from './emptyDirectory.js';
import { expectTask, withTmpDirectory } from '../_test/config.js';

describe('emptyDirectory', () => {
  const expectFile = withFile(expect);

  it(
    'should delete all of the items when not empty',
    withTmpDirectory(async ({ filePath: testDir, createDir, createFile }) => {
      await Promise.all([
        createFile(testDir('some-file')),
        createFile(testDir('some-file-2')),
        createDir(testDir('some-dir')),
      ]);

      await expectFile(testDir()).toHaveDirContent(['some-dir', 'some-file', 'some-file-2']);
      await expectTask(emptyDirectory(testDir())).result.resolves.toEqual(Result.Ok(undefined));
      await expectFile(testDir()).toHaveDirContent([]);
    })
  );

  it(
    'should do nothing when empty',
    withTmpDirectory(async ({ filePath: testDir }) => {
      const target = testDir();
      await expectFile(target).toHaveDirContent([]);
      await expectTask(emptyDirectory(target)).result.resolves.toEqual(Result.Ok(undefined));
      await expectFile(target).toHaveDirContent([]);
    })
  );

  it(
    'should create directory when does not exist',
    withTmpDirectory(async ({ filePath: testDir }) => {
      const target = testDir('does-not-exist');
      await expectTask(emptyDirectory(target)).result.resolves.toEqual(Result.Ok(undefined));
      await expectFile(target).toHaveDirContent([]);
    })
  );
});
