import { Task } from '@w5s/core';
import * as fs from 'node:fs';
import * as path from 'node:path';

export type ErrnoException = NodeJS.ErrnoException;

const taskCreator =
  <A extends unknown[], R>(fn: (...args: A) => Promise<R>) =>
  (...args: A) =>
    Task.Async(async ({ ok, error }) => {
      try {
        return ok(await fn(...args));
      } catch (error_: unknown) {
        return error(error_ as ErrnoException);
      }
    });
const taskCreatorSync =
  <A extends unknown[], R>(fn: (...args: A) => R extends Promise<unknown> ? never : R) =>
  (...args: A) =>
    Task.Sync(({ ok, error }) => {
      try {
        return ok(fn(...args));
      } catch (error_: unknown) {
        return error(error_ as ErrnoException);
      }
    });

export function pathInclude(source: string, destination: string, separator: string = path.sep): boolean {
  if (source === destination) {
    return false;
  }
  const sourceParts = source.split(separator);
  const destinationParts = destination.split(separator);
  return sourceParts.every((current, i) => destinationParts[i] === current);
}

export async function fsExists(filePath: string) {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export function fsExistsSync(filePath: string) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export const rm = taskCreator(fs.promises.rm);
export const rmSync = taskCreatorSync(fs.rmSync);
export const rename = taskCreator(fs.promises.rename);
export const renameSync = taskCreatorSync(fs.renameSync);
export const lstat = taskCreator<[pathLike: fs.PathLike], fs.Stats>((pathLike) =>
  fs.promises.lstat(pathLike, { bigint: false })
);
export const lstatSync = taskCreatorSync<[pathLike: fs.PathLike], fs.Stats>((pathLike) =>
  fs.lstatSync(pathLike, { bigint: false })
);
export const mkdir = taskCreator(fs.promises.mkdir);
export const mkdirSync = taskCreatorSync(fs.mkdirSync);
