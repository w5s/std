import { Task } from '@w5s/core';
import * as nodeFS from 'node:fs';

export type ErrnoException = NodeJS.ErrnoException;
export const ErrnoException = {
  hasInstance(anyValue: unknown): anyValue is ErrnoException {
    return isError(anyValue);
  },
};

function taskCreator<A extends unknown[], R>(fn: (...args: A) => Promise<R>) {
  return (...args: A) =>
    Task.Async(async ({ ok, error }) => {
      try {
        return ok(await fn(...args));
      } catch (error_: unknown) {
        return error(error_ as ErrnoException);
      }
    });
}

function taskCreatorSync<A extends unknown[], R>(fn: (...args: A) => R extends Promise<unknown> ? never : R) {
  return (...args: A) =>
    Task.Sync(({ ok, error }) => {
      try {
        return ok(fn(...args));
      } catch (error_: unknown) {
        return error(error_ as ErrnoException);
      }
    });
}

export const rm = taskCreator(nodeFS.promises.rm);
export const rmSync = taskCreatorSync(nodeFS.rmSync);
export const rename = taskCreator(nodeFS.promises.rename);
export const renameSync = taskCreatorSync(nodeFS.renameSync);
export const lstat = taskCreator<[pathLike: nodeFS.PathLike], nodeFS.Stats>((pathLike) =>
  nodeFS.promises.lstat(pathLike, { bigint: false })
);
export const lstatSync = taskCreatorSync<[pathLike: nodeFS.PathLike], nodeFS.Stats>((pathLike) =>
  nodeFS.lstatSync(pathLike, { bigint: false })
);
export const mkdir = taskCreator(nodeFS.promises.mkdir);
export const mkdirSync = taskCreatorSync(nodeFS.mkdirSync);

function isError(anyValue: unknown): anyValue is Error {
  return Object.prototype.toString.call(anyValue) === '[object Error]';
}
