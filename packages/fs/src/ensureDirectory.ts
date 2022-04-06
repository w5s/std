import { Task, Option, ignore } from '@w5s/core';
import type { FileStats } from './data';
import type { FilePath } from './path';
import { FileError } from './error';
import { linkStat, linkStatSync, mkdir, mkdirSync } from './internal';

type FileType = 'file' | 'directory' | 'symlink';

export function ensureDirectory(filePath: FilePath): Task.Async<void, FileError> {
  const statTask = Task.map(linkStat(filePath), (_) => Option.andThen(_, fileTypeFromStats));
  return Task.andThen(statTask, (linkType) =>
    linkType === undefined
      ? Task.map(mkdir(filePath, { recursive: true }), ignore)
      : ensureType(filePath, 'directory', linkType)
  );
}

export function ensureDirectorySync(filePath: FilePath): Task.Sync<void, FileError> {
  const statTask = Task.map(linkStatSync(filePath), (_) => Option.andThen(_, fileTypeFromStats));
  return Task.andThen(statTask, (linkType) =>
    linkType === undefined
      ? Task.map(mkdirSync(filePath, { recursive: true }), ignore)
      : ensureType(filePath, 'directory', linkType)
  );
}

function fileTypeFromStats(stats: FileStats): Option<FileType> {
  return stats.isFile() ? 'file' : stats.isDirectory() ? 'directory' : stats.isSymbolicLink() ? 'symlink' : Option.None;
}

function ensureType(filePath: FilePath, expectedType: FileType, actualType: FileType) {
  return actualType !== expectedType
    ? Task.Sync.reject(ensureTypeError(filePath, expectedType, actualType))
    : Task.Sync.resolve(undefined);
}

function ensureTypeError(filePath: FilePath, expectedType: FileType, actualType: FileType) {
  return FileError({
    errorType: 'IllegalOperation',
    message: `Ensure path exists, expected '${expectedType}', got '${actualType}'`,
    path: filePath,
  });
}
