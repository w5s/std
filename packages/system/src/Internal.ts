import type { Task } from '@w5s/task';

import { from as taskFrom } from '@w5s/task/dist/Task/from.js';
import * as nodeFS from 'node:fs';
import nodePath from 'node:path';

import type { FilePath } from './FilePath.js';

import { FileError } from './FileError.js';

export const Internal = {
  FS: { ...nodeFS.promises, ...nodeFS.constants },
  Path: nodePath,
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
 * @param error
 */
export function errnoExceptionHandler(error: unknown): FileError {
  return FileError.hasInstance(error)
    ? error
    : ErrnoException.hasInstance(error)
      ? new FileError({
          cause: error,
          code: error.code,
          errno: error.errno,
          fileErrorType: 'OtherError',
          path: error.path as FilePath,
          syscall: error.syscall,
        })
      : new FileError({
          cause: error,
          code: undefined,
          errno: undefined,
          fileErrorType: 'OtherError',
          path: undefined,
          syscall: undefined,
        });
}

export function errnoTask<A extends Array<unknown>, R>(fn: (...args: A) => Promise<R>) {
  return (...args: A): Task<Awaited<R>, FileError> =>
    taskFrom(async ({ reject, resolve }) => {
      try {
        resolve(await fn(...args));
      } catch (error_: unknown) {
        reject(errnoExceptionHandler(error_));
      }
    });
}

export function errnoTaskSync<A extends Array<unknown>, R>(fn: (...args: A) => R) {
  return (...args: A): Task<R, FileError> =>
    taskFrom(({ reject, resolve }) => {
      try {
        resolve(fn(...args));
      } catch (error_: unknown) {
        reject(errnoExceptionHandler(error_));
      }
    });
}

function isError(anyValue: unknown): anyValue is Error {
  return Object.prototype.toString.call(anyValue) === '[object Error]';
}
