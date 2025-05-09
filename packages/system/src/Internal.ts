/* eslint-disable jsdoc/require-example */

import * as nodeFS from 'node:fs';
import nodePath from 'node:path';
import type { Task } from '@w5s/task';
import { from as taskFrom } from '@w5s/task/dist/Task/from.js';
import { FileError } from './FileError.js';
import type { FilePath } from './FilePath.js';

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
 */
export function errnoExceptionHandler(error: unknown): FileError {
  return FileError.hasInstance(error)
    ? error
    : ErrnoException.hasInstance(error)
      ? new FileError({
          fileErrorType: 'OtherError',
          path: error.path as FilePath,
          cause: error,
          syscall: error.syscall,
          errno: error.errno,
          code: error.code,
        })
      : new FileError({
          fileErrorType: 'OtherError',
          path: undefined,
          cause: error,
          syscall: undefined,
          errno: undefined,
          code: undefined,
        });
}

export function errnoTask<A extends unknown[], R>(fn: (...args: A) => Promise<R>) {
  return (...args: A): Task<Awaited<R>, FileError> =>
    taskFrom(async ({ resolve, reject }) => {
      try {
        resolve(await fn(...args));
      } catch (error_: unknown) {
        reject(errnoExceptionHandler(error_));
      }
    });
}

export function errnoTaskSync<A extends unknown[], R>(fn: (...args: A) => R) {
  return (...args: A): Task<R, FileError> =>
    taskFrom(({ resolve, reject }) => {
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
