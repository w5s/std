import { Symbol } from '@w5s/core';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { fsStub, withFile } from '../Testing.js';
import { ensureDirectory, ensureFile, ensureSymbolicLink } from './ensure.js';

const expectFile = withFile(expect);
const expectTask = withTask(expect);

let fs = fsStub();

beforeEach(() => {
  fs = fsStub();
});

afterEach(async () => {
  await fs[Symbol.asyncDispose]();
});

describe(ensureDirectory, () => {
  it('should work for existing directory', async () => {
    const ensured = fs.path('test');
    await fs.mkdir(ensured);

    const task = ensureDirectory(ensured);
    await expectTask(task).toResolveAsync(undefined);
    await expectFile(ensured).toBeADirectory();
  });
  it('should work for non existing directory', async () => {
    const ensured = fs.path('test');

    const task = ensureDirectory(ensured);
    await expectTask(task).toResolveAsync(undefined);
    await expectFile(ensured).toBeADirectory();
  });
  it('should return error for file', async () => {
    const ensured = fs.path('test');
    await fs.touch(ensured);

    const task = ensureDirectory(ensured);
    await expectTask(task).toRejectAsync(
      expect.objectContaining({
        name: 'FileError',
        message: `Ensure path exists, expected 'directory', got 'file'`,
        fileErrorType: 'UserError',
        errno: undefined,
        code: undefined,
        path: expect.any(String),
        syscall: undefined,
      }),
    );
  });
});

describe(ensureFile, () => {
  it('should work for existing file', async () => {
    const ensured = fs.path('test');
    await fs.touch(ensured);

    const task = ensureFile(ensured);
    await expectTask(task).toResolveAsync(undefined);
    await expectFile(ensured).toBeAFile();
  });
  it('should work for non-existing files', async () => {
    const ensured = fs.path('test');

    const task = ensureFile(ensured);
    await expectTask(task).toResolveAsync(undefined);
    await expectFile(ensured).toBeAFile();
  });
  it('should return error for directory', async () => {
    const ensured = fs.path('some-directory');
    await fs.mkdir(ensured);

    const task = ensureFile(ensured);
    await expectTask(task).toRejectAsync(
      expect.objectContaining({
        name: 'FileError',
        message: `Ensure path exists, expected 'file', got 'directory'`,
        fileErrorType: 'UserError',
        errno: undefined,
        code: undefined,
        path: expect.any(String),
        syscall: undefined,
      }),
    );
  });
});

describe(ensureSymbolicLink, () => {
  it('should work for existing link', async () => {
    const source = fs.path('src');
    const destination = fs.path('link');
    await fs.mkdir(source);
    await fs.symlink(source, destination);

    const task = ensureSymbolicLink(source, destination);
    await expectTask(task).toResolveAsync(undefined);
    await expectFile(destination).toBeASymbolicLink();
  });
  it('should work for non-existing files', async () => {
    const source = fs.path('src');
    const destination = fs.path('link');

    const task = ensureSymbolicLink(source, destination);
    await expectTask(task).toResolveAsync(undefined);
    await expectFile(destination).toBeASymbolicLink();
  });
  it('should return error for directory, file', async () => {
    const source = fs.path('src');
    const destination = fs.path('link');
    await fs.mkdir(destination);

    const task = ensureSymbolicLink(source, destination);
    await expectTask(task).toRejectAsync(
      expect.objectContaining({
        name: 'FileError',
        message: `Ensure path exists, expected 'symlink', got 'directory'`,
        fileErrorType: 'UserError',
        errno: undefined,
        code: undefined,
        path: expect.any(String),
        syscall: undefined,
      }),
    );
  });
});
