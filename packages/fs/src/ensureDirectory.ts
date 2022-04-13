import { Task, Option, ignore, pipe } from '@w5s/core';
import type { FilePath } from './path';
import { FileError } from './error';
import { ErrnoException, lstat, lstatSync, mkdir, mkdirSync } from './internal';

type FileType = 'file' | 'directory' | 'symlink';

export function ensureDirectory(filePath: FilePath): Task.Async<void, FileError> {
  const handleError = toFileError(filePath);
  return pipe(lstat(filePath)).to(
    (_) => Task.map(_, fileTypeFromStats),
    (_) => Task.orElse(_, noneWhenNotFound),
    (_) =>
      Task.andThen(_, (linkType) =>
        Option.isNone(linkType)
          ? Task.mapError(Task.map(mkdir(filePath, { recursive: true }), ignore), handleError)
          : ensureType(filePath, 'directory', linkType)
      ),
    (_) => Task.mapError(_, handleError)
  );
}

export function ensureDirectorySync(filePath: FilePath): Task.Sync<void, FileError> {
  const handleError = toFileError(filePath);
  return pipe(lstatSync(filePath)).to(
    (_) => Task.map(_, fileTypeFromStats),
    (_) => Task.orElse(_, noneWhenNotFound),
    (_) =>
      Task.andThen(_, (linkType) =>
        Option.isNone(linkType)
          ? Task.mapError(Task.map(mkdirSync(filePath, { recursive: true }), ignore), handleError)
          : ensureType(filePath, 'directory', linkType)
      ),
    (_) => Task.mapError(_, handleError)
  );
}

function fileTypeFromStats(
  stats: import('node:fs').Stats | import('node:fs').BigIntStats | undefined
): Option<FileType> {
  return stats == null
    ? stats
    : stats.isFile()
    ? 'file'
    : stats.isDirectory()
    ? 'directory'
    : stats.isSymbolicLink()
    ? 'symlink'
    : Option.None;
}

function noneWhenNotFound(error: ErrnoException): Task.Sync<Option<never>, ErrnoException> {
  return error.code === 'ENOENT' ? Task.Sync.resolve(undefined) : Task.Sync.reject(error);
}

function ensureType(filePath: FilePath, expectedType: FileType, actualType: FileType): Task.Sync<void, FileError> {
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

function toFileError(path: FilePath) {
  return (error: FileError | ErrnoException) =>
    FileError.hasInstance(error)
      ? error
      : FileError({
          errorType: 'IllegalOperation', // TODO: improve handling
          path,
          cause: error,
        });
}
