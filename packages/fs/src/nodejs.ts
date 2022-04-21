import { Option, Task } from '@w5s/core';
import * as nodeFS from 'node:fs';
import { FileError } from './error';
import { FilePath } from './path';

export type ErrnoException = NodeJS.ErrnoException;
export const ErrnoException = {
  hasInstance(anyValue: unknown): anyValue is ErrnoException {
    return isError(anyValue);
  },
};

export function taskCreator<A extends unknown[], R>(fn: (...args: A) => Promise<R>) {
  return (...args: A) =>
    Task(async ({ ok, error }) => {
      try {
        return ok(await fn(...args));
      } catch (error_: unknown) {
        return error(errnoExceptionHandler(error_));
      }
    });
}

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

export const rm = taskCreator(nodeFS.promises.rm);
export const rename = taskCreator(nodeFS.promises.rename);
export const lstat = taskCreator<[pathLike: nodeFS.PathLike], nodeFS.Stats>((pathLike) =>
  nodeFS.promises.lstat(pathLike, { bigint: false })
);
export const mkdir = taskCreator(nodeFS.promises.mkdir);

function isError(anyValue: unknown): anyValue is Error {
  return Object.prototype.toString.call(anyValue) === '[object Error]';
}
