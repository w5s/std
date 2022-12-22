/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Option, Task } from '@w5s/core';
import * as nodeFS from 'node:fs';
import * as nodeProcess from 'node:process';
import { FileError } from './error.js';
import type { FilePath } from './filePath.js';

export const Internal = {
  FS: { ...nodeFS.promises, ...nodeFS.constants },
  Process: { ...nodeProcess },
};

export type ErrnoException = NodeJS.ErrnoException;
export const ErrnoException = {
  hasInstance(anyValue: unknown): anyValue is ErrnoException {
    return isError(anyValue);
  },
};

/**
 * Converts an ErrnoException to a FileError.
 *
 * @example
 */
export function errnoExceptionHandler(error: unknown): FileError {
  return FileError.hasInstance(error)
    ? error
    : ErrnoException.hasInstance(error)
    ? FileError({
        fileErrorType: 'OtherError',
        path: error.path as FilePath,
        cause: error,
        syscall: error.syscall,
        errno: error.errno,
        code: error.code,
      })
    : FileError({
        fileErrorType: 'OtherError',
        path: Option.None,
        cause: error,
        syscall: Option.None,
        errno: Option.None,
        code: Option.None,
      });
}

export function errnoTask<A extends unknown[], R>(fn: (...args: A) => Promise<R>) {
  return (...args: A) =>
    Task(async ({ ok, error }) => {
      try {
        return ok(await fn(...args));
      } catch (error_: unknown) {
        return error(errnoExceptionHandler(error_));
      }
    });
}

export function errnoTaskSync<A extends unknown[], R>(fn: (...args: A) => R) {
  return (...args: A) =>
    Task(({ ok, error }) => {
      try {
        return ok(fn(...args));
      } catch (error_: unknown) {
        return error(errnoExceptionHandler(error_));
      }
    });
}

function isError(anyValue: unknown): anyValue is Error {
  return Object.prototype.toString.call(anyValue) === '[object Error]';
}
