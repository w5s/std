import { Result } from '@w5s/core';
import * as fs from 'node:fs/promises';
import { ensureDirectory, ensureFile } from './ensure';
import { FileError } from './error';
import { expectFile, expectTask, withTmpDirectory } from './_test/config.js';

describe(ensureDirectory, () => {
  test(
    'should work for existing directory',
    withTmpDirectory(async ({ filePath }) => {
      const ensured = filePath('test');
      await fs.mkdir(ensured);

      await expectTask(ensureDirectory(ensured)).resolves.toEqual(Result.Ok(undefined));
      await expectFile(ensured).toBeADirectory();
    })
  );
  test(
    'should work for non existing directory',
    withTmpDirectory(async ({ filePath }) => {
      const ensured = filePath('test');

      await expectTask(ensureDirectory(ensured)).resolves.toEqual(Result.Ok(undefined));
      await expectFile(ensured).toBeADirectory();
    })
  );
  test(
    'should return error for file',
    withTmpDirectory(async ({ filePath }) => {
      const ensured = filePath('test');
      await fs.writeFile(ensured, '');

      await expectTask(ensureDirectory(ensured)).resolves.toEqual(
        Result.Error(
          FileError({
            message: `Ensure path exists, expected 'directory', got 'file'`,
            fileErrorType: 'OtherError',
            errno: undefined,
            code: undefined,
            path: undefined,
            syscall: undefined,
          })
        )
      );
    })
  );
});

describe(ensureFile, () => {
  test(
    'should work for existing file',
    withTmpDirectory(async ({ filePath }) => {
      const ensured = filePath('test');
      await fs.writeFile(ensured, '');

      await expectTask(ensureFile(ensured)).resolves.toEqual(Result.Ok(undefined));
      await expectFile(ensured).toBeAFile();
    })
  );
  test(
    'should work for non-existing files',
    withTmpDirectory(async ({ filePath }) => {
      const ensured = filePath('test');

      await expectTask(ensureFile(ensured)).resolves.toEqual(Result.Ok(undefined));
      await expectFile(ensured).toBeAFile();
    })
  );
  test(
    'should return error for directory',
    withTmpDirectory(async ({ filePath }) => {
      const ensured = filePath();

      await expectTask(ensureFile(ensured)).resolves.toEqual(
        Result.Error(
          FileError({
            message: `Ensure path exists, expected 'file', got 'directory'`,
            fileErrorType: 'OtherError',
            errno: undefined,
            code: undefined,
            path: undefined,
            syscall: undefined,
          })
        )
      );
    })
  );
});
