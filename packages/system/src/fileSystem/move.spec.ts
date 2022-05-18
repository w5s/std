import { Result } from '@w5s/core';
import * as nodeFS from 'node:fs';
import { FileError } from '../error';
import { expectFile, expectTask, withTmpDirectory } from '../_test/config';
import { move } from './move';

describe(move, () => {
  test(
    'should reject if source directory does not exist',
    withTmpDirectory(async ({ filePath }) => {
      const srcDir = filePath('src');
      const destDir = filePath('dest');

      await expectTask(move(srcDir, destDir)).resolves.toEqual(Result.Error(FileError({})));
    })
  );

  test(
    'should move directory if destination does not exist',
    withTmpDirectory(async ({ filePath, createDir }) => {
      const srcDir = filePath('src');
      const destDir = filePath('dest');
      await createDir(srcDir);

      await expectTask(move(srcDir, destDir)).resolves.toEqual(Result.Ok(undefined));
      await expectFile(destDir).toExist();
    })
  );

  test(
    'should move directory if destination does not exist and overwrite is true',
    withTmpDirectory(async ({ filePath, createDir }) => {
      const srcDir = filePath('src');
      const destDir = filePath('dest');
      await createDir(srcDir);

      await expectTask(move(srcDir, destDir, { overwrite: true })).resolves.toEqual(Result.Ok(undefined));
      await expectFile(destDir).toExist();
    })
  );

  test(
    'should reject if source file does not exists',
    withTmpDirectory(async ({ filePath }) => {
      const srcFile = filePath('src', 'test.txt');
      const destFile = filePath('dest', 'test.txt');

      await expectTask(move(srcFile, destFile)).resolves.toEqual(Result.Error(FileError({})));
    })
  );

  test(
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
      await expectTask(move(srcFile, destFile)).resolves.toEqual(
        Result.Error(
          FileError({
            message: 'Destination already exists',
          })
        )
      );

      // move again with overwrite
      await expectTask(move(srcFile, destFile, { overwrite: true })).resolves.toEqual(Result.Ok(undefined));

      await expectFile(srcFile).not.toExist();
      await expectFile(destFile).toExist();
      await expectFile(destFile).toHaveContent('src');
    })
  );

  test(
    'should move directory',
    withTmpDirectory(async ({ filePath, createDir }) => {
      const srcDir = filePath('src');
      const destDir = filePath('dest');
      const srcFile = filePath('src', 'test.txt');
      const destFile = filePath('dest', 'test.txt');

      await createDir(srcDir);
      await expectFile(srcDir).toExist();
      await nodeFS.promises.writeFile(srcFile, 'src');

      await expectTask(move(srcDir, destDir)).resolves.toEqual(Result.Ok(undefined));

      await expectFile(srcFile).not.toExist();
      await expectFile(destDir).toExist();
      await expectFile(destFile).toExist();
      await expectFile(destFile).toHaveContent('src');
    })
  );

  test(
    'should move if source and destination exists and overwrite is true',
    withTmpDirectory(async ({ filePath, createDir }) => {
      const srcDir = filePath('src');
      const destDir = filePath('dest');
      const srcFile = filePath('src', 'test.txt');
      const destFile = filePath('dest', 'test.txt');

      await createDir(srcDir);
      await createDir(destDir);
      await Promise.all([nodeFS.promises.writeFile(srcFile, 'src'), nodeFS.promises.writeFile(destFile, 'dest')]);

      await expectTask(move(srcDir, destDir, { overwrite: true })).resolves.toEqual(Result.Ok(undefined));

      await expectFile(srcDir).not.toExist();
      await expectFile(destDir).toExist();
      await expectFile(destFile).toExist();
      await expectFile(destFile).toHaveContent('src');
    })
  );

  test(
    'should rejects if moving to a sub directory of source',
    withTmpDirectory(async ({ filePath, createDir }) => {
      const srcDir = filePath('src');
      const destDir = filePath('src', 'sub');
      await createDir(destDir);

      await expectTask(move(srcDir, destDir)).resolves.toEqual(
        Result.Error(
          FileError({
            message: `Cannot move '${srcDir}' to a subdirectory of itself, '${destDir}'.`,
          })
        )
      );
    })
  );
});
