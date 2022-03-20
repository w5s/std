import { Task, Option } from '@w5s/core';
import * as fs from 'node:fs';
import { MakeDirectoryOptions } from 'node:fs';
import * as path from 'node:path';
import { FilePath, FileStats } from './data';
import { FileError } from './error';

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

export const fsRemove = fs.promises.rm;

export const fsRemoveSync = fs.rmSync;

export const fsRename = fs.promises.rename;

export const fsRenameSync = fs.renameSync;

export function linkStat(filePath: FilePath): Task.Async<Option<FileStats>, FileError> {
  return Task.Async(async ({ ok }) => {
    try {
      return ok(await fs.promises.lstat(filePath));
    } catch {
      // throw error;
      return ok(undefined);
    }
  });
}

export function linkStatSync(filePath: FilePath): Task.Sync<Option<FileStats>, FileError> {
  return Task.Sync(({ ok }) => {
    try {
      return ok(fs.lstatSync(filePath));
    } catch {
      // throw error;
      return ok(undefined);
    }
  });
}

export function mkdir(filePath: FilePath, options?: MakeDirectoryOptions) {
  return Task.Async(async ({ ok }) => ok(await fs.promises.mkdir(filePath, options)));
}

export function mkdirSync(filePath: FilePath, options?: MakeDirectoryOptions) {
  return Task.Sync(({ ok }) => ok(fs.mkdirSync(filePath, options)));
}
