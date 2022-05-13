import { Task, Array, ignore } from '@w5s/core';
import type * as nodeFS from 'node:fs';
import { FileError } from '../error';
import { Internal, errnoTask } from '../internal';
import { FilePath } from '../path';

export function listDirectory(filePath: FilePath, options?: listDirectory.Options): Task<Array<FilePath>, FileError> {
  // @ts-ignore - `readdir` returns an array of strings instead of a Array<FilePath>
  return errnoTask<[path: nodeFS.PathLike, options?: BufferEncoding], string[]>(Internal.FS.readdir)(filePath, options);
}
export namespace listDirectory {
  export type Options = BufferEncoding;
}

export function createDirectory(path: FilePath, options?: createDirectory.Options): Task<void, FileError> {
  return Task.map(errnoTask(Internal.FS.mkdir)(path, options), ignore);
}
export namespace createDirectory {
  export type Options = nodeFS.MakeDirectoryOptions;
}

export const lstat = errnoTask<[pathLike: nodeFS.PathLike], nodeFS.Stats>((pathLike) =>
  Internal.FS.lstat(pathLike, { bigint: false })
);
export const stat = errnoTask<[pathLike: nodeFS.PathLike], nodeFS.Stats>((pathLike) =>
  Internal.FS.stat(pathLike, { bigint: false })
);
export const writeFile = errnoTask(Internal.FS.writeFile);
export const symlink = errnoTask(Internal.FS.symlink);

export function copyFile(source: FilePath, destination: FilePath): Task<void, FileError> {
  return errnoTask(Internal.FS.copyFile)(source, destination);
}

export function rename(oldPath: FilePath, newPath: FilePath): Task<void, FileError> {
  return errnoTask(Internal.FS.rename)(oldPath, newPath);
}

export function remove(filePath: FilePath, options?: remove.Options): Task<void, FileError> {
  return errnoTask(Internal.FS.rm)(filePath, options);
}
export namespace remove {
  export type Options = nodeFS.RmOptions;
}
