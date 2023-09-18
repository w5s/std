import * as nodeFS from 'node:fs';
import { Result } from '@w5s/core';
import { describe, it, expect } from 'vitest';
import { withFile } from '@w5s/core/dist/testing.js';
import { FileError } from '../error.js';
import { expectTask, withTmpDirectory } from '../_test/config.js';
import { move } from './move.js';

const expectFile = withFile(expect);

describe('move', () => {
  it(
    'should reject if source directory does not exist',
    withTmpDirectory(async ({ filePath }) => {
      const srcDir = filePath('src');
      const destDir = filePath('dest');

      await expectTask(move(srcDir, destDir)).result.resolves.toEqual(Result.Error(FileError({})));
    })
  );

  it(
    'should move directory if destination does not exist',
    withTmpDirectory(async ({ filePath, createDir }) => {
      const srcDir = filePath('src');
      const destDir = filePath('dest');
      await createDir(srcDir);

      await expectTask(move(srcDir, destDir)).result.resolves.toEqual(Result.Ok(undefined));
      await expectFile(destDir).toExist();
    })
  );

  it(
    'should move directory if destination does not exist and overwrite is true',
    withTmpDirectory(async ({ filePath, createDir }) => {
      const srcDir = filePath('src');
      const destDir = filePath('dest');
      await createDir(srcDir);

      await expectTask(move(srcDir, destDir, { overwrite: true })).result.resolves.toEqual(Result.Ok(undefined));
      await expectFile(destDir).toExist();
    })
  );

  it(
    'should reject if source file does not exists',
    withTmpDirectory(async ({ filePath }) => {
      const srcFile = filePath('src', 'test.txt');
      const destFile = filePath('dest', 'test.txt');

      await expectTask(move(srcFile, destFile)).result.resolves.toEqual(Result.Error(FileError({})));
    })
  );

  it(
    'should move file if destination exists',
    withTmpDirectory(async ({ filePath, createDir }) => {
      const srcDir = filePath('src');
      const destDir = filePath('dest');
      const srcFile = filePath('src', 'test.txt');
      const destFile = filePath('dest', 'test.txt');

      // make sure files exists
      await createDir(srcDir);
      await createDir(destDir);
      await Promise.all([nodeFS.promises.writeFile(srcFile, 'src'), nodeFS.promises.writeFile(destFile, 'dest')]);

      // move it without override
      await expectTask(move(srcFile, destFile)).result.resolves.toEqual(
        Result.Error(
          FileError({
            message: 'Destination already exists',
          })
        )
      );

      // move again with overwrite
      await expectTask(move(srcFile, destFile, { overwrite: true })).result.resolves.toEqual(Result.Ok(undefined));

      await expectFile(srcFile).not.toExist();
      await expectFile(destFile).toExist();
      await expectFile(destFile).toHaveFileContent('src');
    })
  );

  it(
    'should move directory',
    withTmpDirectory(async ({ filePath, createDir }) => {
      const srcDir = filePath('src');
      const destDir = filePath('dest');
      const srcFile = filePath('src', 'test.txt');
      const destFile = filePath('dest', 'test.txt');

      await createDir(srcDir);
      await expectFile(srcDir).toExist();
      await nodeFS.promises.writeFile(srcFile, 'src');

      await expectTask(move(srcDir, destDir)).result.resolves.toEqual(Result.Ok(undefined));

      await expectFile(srcFile).not.toExist();
      await expectFile(destDir).toExist();
      await expectFile(destFile).toExist();
      await expectFile(destFile).toHaveFileContent('src');
    })
  );

  it(
    'should move if source and destination exists and overwrite is true',
    withTmpDirectory(async ({ filePath, createDir }) => {
      const srcDir = filePath('src');
      const destDir = filePath('dest');
      const srcFile = filePath('src', 'test.txt');
      const destFile = filePath('dest', 'test.txt');

      await createDir(srcDir);
      await createDir(destDir);
      await Promise.all([nodeFS.promises.writeFile(srcFile, 'src'), nodeFS.promises.writeFile(destFile, 'dest')]);

      await expectTask(move(srcDir, destDir, { overwrite: true })).result.resolves.toEqual(Result.Ok(undefined));

      await expectFile(srcDir).not.toExist();
      await expectFile(destDir).toExist();
      await expectFile(destFile).toExist();
      await expectFile(destFile).toHaveFileContent('src');
    })
  );

  it(
    'should rejects if moving to a sub directory of source',
    withTmpDirectory(async ({ filePath, createDir }) => {
      const srcDir = filePath('src');
      const destDir = filePath('src', 'sub');
      await createDir(destDir);

      await expectTask(move(srcDir, destDir)).result.resolves.toEqual(
        Result.Error(
          FileError({
            message: `Cannot move '${srcDir}' to a subdirectory of itself, '${destDir}'.`,
          })
        )
      );
    })
  );
});
