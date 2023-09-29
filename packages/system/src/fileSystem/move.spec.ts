import * as nodeFS from 'node:fs';
import { Result } from '@w5s/core';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fsStub, withFile } from '../testing.js';
import { FileError } from '../error.js';
import { expectTask } from '../_test/config.js';
import { move } from './move.js';

const expectFile = withFile(expect);

describe('move', () => {
  let fs = fsStub();

  beforeEach(() => {
    fs = fsStub();
  });

  afterEach(async () => {
    await fs[Symbol.asyncDispose]();
  });

  it('should reject if source directory does not exist', async () => {
    const srcDir = fs.path('src');
    const destDir = fs.path('dest');

    await expectTask(move(srcDir, destDir)).result.resolves.toEqual(Result.Error(FileError({})));
  });

  it('should move directory if destination does not exist', async () => {
    const srcDir = fs.path('src');
    const destDir = fs.path('dest');
    await fs.mkdir(srcDir);

    await expectTask(move(srcDir, destDir)).result.resolves.toEqual(Result.Ok(undefined));
    await expectFile(destDir).toExist();
  });

  it('should move directory if destination does not exist and overwrite is true', async () => {
    const srcDir = fs.path('src');
    const destDir = fs.path('dest');
    await fs.mkdir(srcDir);

    await expectTask(move(srcDir, destDir, { overwrite: true })).result.resolves.toEqual(Result.Ok(undefined));
    await expectFile(destDir).toExist();
  });

  it('should reject if source file does not exists', async () => {
    const srcFile = fs.path('src', 'test.txt');
    const destFile = fs.path('dest', 'test.txt');

    await expectTask(move(srcFile, destFile)).result.resolves.toEqual(Result.Error(FileError({})));
  });

  it('should move file if destination exists', async () => {
    const srcDir = fs.path('src');
    const destDir = fs.path('dest');
    const srcFile = fs.path('src', 'test.txt');
    const destFile = fs.path('dest', 'test.txt');

    // make sure files exists
    await fs.mkdir(srcDir);
    await fs.mkdir(destDir);
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
  });

  it('should move directory', async () => {
    const srcDir = fs.path('src');
    const destDir = fs.path('dest');
    const srcFile = fs.path('src', 'test.txt');
    const destFile = fs.path('dest', 'test.txt');

    await fs.mkdir(srcDir);
    await expectFile(srcDir).toExist();
    await nodeFS.promises.writeFile(srcFile, 'src');

    await expectTask(move(srcDir, destDir)).result.resolves.toEqual(Result.Ok(undefined));

    await expectFile(srcFile).not.toExist();
    await expectFile(destDir).toExist();
    await expectFile(destFile).toExist();
    await expectFile(destFile).toHaveFileContent('src');
  });

  it('should move if source and destination exists and overwrite is true', async () => {
    const srcDir = fs.path('src');
    const destDir = fs.path('dest');
    const srcFile = fs.path('src', 'test.txt');
    const destFile = fs.path('dest', 'test.txt');

    await fs.mkdir(srcDir);
    await fs.mkdir(destDir);
    await Promise.all([nodeFS.promises.writeFile(srcFile, 'src'), nodeFS.promises.writeFile(destFile, 'dest')]);

    await expectTask(move(srcDir, destDir, { overwrite: true })).result.resolves.toEqual(Result.Ok(undefined));

    await expectFile(srcDir).not.toExist();
    await expectFile(destDir).toExist();
    await expectFile(destFile).toExist();
    await expectFile(destFile).toHaveFileContent('src');
  });

  it('should rejects if moving to a sub directory of source', async () => {
    const srcDir = fs.path('src');
    const destDir = fs.path('src', 'sub');
    await fs.mkdir(destDir);

    await expectTask(move(srcDir, destDir)).result.resolves.toEqual(
      Result.Error(
        FileError({
          message: `Cannot move '${srcDir}' to a subdirectory of itself, '${destDir}'.`,
        })
      )
    );
  });
});
