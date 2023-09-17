import * as fs from 'node:fs/promises';
import { Result } from '@w5s/core';
import { describe, it, expect } from 'vitest';
import { withFile } from '@w5s/core/dist/testing.js';
import { ensureDirectory, ensureFile, ensureSymbolicLink } from './ensure.js';
import { FileError } from '../error.js';
import { expectTask, withTmpDirectory } from '../_test/config.js';

const expectFile = withFile(expect);

describe('ensureDirectory', () => {
  it(
    'should work for existing directory',
    withTmpDirectory(async ({ filePath }) => {
      const ensured = filePath('test');
      await fs.mkdir(ensured);

      await expectTask(ensureDirectory(ensured)).result.resolves.toEqual(Result.Ok(undefined));
      await expectFile(ensured).toBeADirectory();
    })
  );
  it(
    'should work for non existing directory',
    withTmpDirectory(async ({ filePath }) => {
      const ensured = filePath('test');

      await expectTask(ensureDirectory(ensured)).result.resolves.toEqual(Result.Ok(undefined));
      await expectFile(ensured).toBeADirectory();
    })
  );
  it(
    'should return error for file',
    withTmpDirectory(async ({ filePath }) => {
      const ensured = filePath('test');
      await fs.writeFile(ensured, '');

      await expectTask(ensureDirectory(ensured)).result.resolves.toEqual(
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

describe('ensureFile', () => {
  it(
    'should work for existing file',
    withTmpDirectory(async ({ filePath }) => {
      const ensured = filePath('test');
      await fs.writeFile(ensured, '');

      await expectTask(ensureFile(ensured)).result.resolves.toEqual(Result.Ok(undefined));
      await expectFile(ensured).toBeAFile();
    })
  );
  it(
    'should work for non-existing files',
    withTmpDirectory(async ({ filePath }) => {
      const ensured = filePath('test');

      await expectTask(ensureFile(ensured)).result.resolves.toEqual(Result.Ok(undefined));
      await expectFile(ensured).toBeAFile();
    })
  );
  it(
    'should return error for directory',
    withTmpDirectory(async ({ filePath }) => {
      const ensured = filePath();

      await expectTask(ensureFile(ensured)).result.resolves.toEqual(
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

describe('ensureSymbolicLink', () => {
  it(
    'should work for existing link',
    withTmpDirectory(async ({ filePath }) => {
      const source = filePath('src');
      const destination = filePath('link');
      await fs.mkdir(source);
      await fs.symlink(source, destination);

      await expectTask(ensureSymbolicLink(source, destination)).result.resolves.toEqual(Result.Ok(undefined));
      await expectFile(destination).toBeASymbolicLink();
    })
  );
  it(
    'should work for non-existing files',
    withTmpDirectory(async ({ filePath }) => {
      const source = filePath('src');
      const destination = filePath('link');

      await expectTask(ensureSymbolicLink(source, destination)).result.resolves.toEqual(Result.Ok(undefined));
      await expectFile(destination).toBeASymbolicLink();
    })
  );
  it(
    'should return error for directory, file',
    withTmpDirectory(async ({ filePath }) => {
      const source = filePath('src');
      const destination = filePath('link');
      await fs.mkdir(destination);

      await expectTask(ensureSymbolicLink(source, destination)).result.resolves.toEqual(
        Result.Error(
          FileError({
            message: `Ensure path exists, expected 'symlink', got 'directory'`,
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
