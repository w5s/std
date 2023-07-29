/* eslint-disable jsdoc/require-example */

import * as nodeFS from 'node:fs';
import * as nodePath from 'node:path';
import * as nodeProcess from 'node:process';
import type { Task } from '@w5s/core';
import { FileError } from './error.js';
import type { FilePath } from './filePath.js';

export const Internal = {
  FS: { ...nodeFS.promises, ...nodeFS.constants },
  Path: nodePath,
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
        path: undefined,
        cause: error,
        syscall: undefined,
        errno: undefined,
        code: undefined,
      });
}

export function errnoTask<A extends unknown[], R>(fn: (...args: A) => Promise<R>) {
  return (...args: A): Task<Awaited<R>, FileError> => ({
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    taskRun: async (resolve, reject) => {
      try {
        resolve(await fn(...args));
      } catch (error_: unknown) {
        reject(errnoExceptionHandler(error_));
      }
    },
  });
}

export function errnoTaskSync<A extends unknown[], R>(fn: (...args: A) => R) {
  return (...args: A): Task<R, FileError> => ({
    taskRun: (resolve, reject) => {
      try {
        resolve(fn(...args));
      } catch (error_: unknown) {
        reject(errnoExceptionHandler(error_));
      }
    },
  });
}

function isError(anyValue: unknown): anyValue is Error {
  return Object.prototype.toString.call(anyValue) === '[object Error]';
}
