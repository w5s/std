import { Task, Result } from '@w5s/core';
import type { FilePath, FileType } from './data';
import { FileError } from './error';
import { fsLinkType, fsLinkTypeSync, fsMkdir, fsMkdirSync } from './internal';

export function ensureDirectory(filePath: FilePath): Task.Async<void, FileError> {
  return Task.Async(async ({ ok }) => {
    const fileType = await fsLinkType(filePath);
    if (fileType === undefined) {
      await fsMkdir(filePath, { recursive: true });
      return ok(undefined);
    }
    return ensureType(filePath, fileType);
  });
}

export function ensureDirectorySync(filePath: FilePath): Task.Sync<void, FileError> {
  return Task.Sync(({ ok }) => {
    const fileType = fsLinkTypeSync(filePath);
    if (fileType === undefined) {
      fsMkdirSync(filePath, { recursive: true });
      return ok(undefined);
    }
    return ensureType(filePath, fileType);
  });
}

function ensureType(filePath: FilePath, actualType: FileType) {
  if (actualType !== 'directory') {
    return Result.Error(ensureTypeError(filePath, 'directory', actualType));
  }
  return Result.Ok(undefined);
}

function ensureTypeError(filePath: FilePath, expectedType: FileType, actualType: FileType) {
  return FileError({
    errorType: 'IllegalOperation',
    message: `Ensure path exists, expected '${expectedType}', got '${actualType}'`,
    path: filePath,
  });
}
