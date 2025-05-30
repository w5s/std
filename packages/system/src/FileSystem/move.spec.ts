import * as nodeFS from 'node:fs';
import { Symbol } from '@w5s/core';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { fsStub, withFile } from '../Testing.js';
import { move } from './move.js';

const expectFile = withFile(expect);
const expectTask = withTask(expect);

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

    const task = move(srcDir, destDir);
    await expectTask(task).toRejectAsync(
      expect.objectContaining({
        name: 'FileError',
        fileErrorType: 'OtherError',
        path: expect.any(String),
        errno: -2,
        code: 'ENOENT',
        syscall: 'stat',
      }),
    );
  });

  it('should move directory if destination does not exist', async () => {
    const srcDir = fs.path('src');
    const destDir = fs.path('dest');
    await fs.mkdir(srcDir);

    const task = move(srcDir, destDir);
    await expectTask(task).toResolveAsync(undefined);
    await expectFile(destDir).toExist();
  });

  it('should move directory if destination does not exist and overwrite is true', async () => {
    const srcDir = fs.path('src');
    const destDir = fs.path('dest');
    await fs.mkdir(srcDir);

    const task = move(srcDir, destDir, { overwrite: true });
    await expectTask(task).toResolveAsync(undefined);
    await expectFile(destDir).toExist();
  });

  it('should reject if source file does not exists', async () => {
    const srcFile = fs.path('src', 'test.txt');
    const destFile = fs.path('dest', 'test.txt');

    const task = move(srcFile, destFile);
    await expectTask(task).toRejectAsync(
      expect.objectContaining({
        name: 'FileError',
        fileErrorType: 'OtherError',
        path: expect.any(String),
        errno: -2,
        code: 'ENOENT',
        syscall: 'stat',
      }),
    );
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
    const taskFail = move(srcFile, destFile);
    await expectTask(taskFail).toRejectAsync(
      expect.objectContaining({
        name: 'FileError',
        fileErrorType: 'UserError',
        path: expect.any(String),
        message: 'Destination already exists',
        errno: undefined,
        code: undefined,
        syscall: undefined,
      }),
    );

    // move again with overwrite
    const task = move(srcFile, destFile, { overwrite: true });
    await expectTask(task).toResolveAsync(undefined);

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

    const task = move(srcDir, destDir);
    await expectTask(task).toResolveAsync(undefined);

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

    const task = move(srcDir, destDir, { overwrite: true });
    await expectTask(task).toResolveAsync(undefined);

    await expectFile(srcDir).not.toExist();
    await expectFile(destDir).toExist();
    await expectFile(destFile).toExist();
    await expectFile(destFile).toHaveFileContent('src');
  });

  it('should rejects if moving to a sub directory of source', async () => {
    const srcDir = fs.path('src');
    const destDir = fs.path('src', 'sub');
    await fs.mkdir(destDir);

    await expectTask(move(srcDir, destDir)).toRejectAsync(
      expect.objectContaining({
        name: 'FileError',
        fileErrorType: 'UserError',
        path: expect.any(String),
        message: `Cannot move '${srcDir}' to a subdirectory of itself, '${destDir}'.`,
        errno: undefined,
        code: undefined,
        syscall: undefined,
      }),
    );
  });
});
