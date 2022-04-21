import { Task, Option, ignore, pipe } from '@w5s/core';
import type { FilePath } from './path';
import { FileError } from './error';
import { lstat, mkdir } from './nodejs';

type FileType = 'file' | 'directory' | 'symlink';

export function ensureDirectory(filePath: FilePath): Task<void, FileError> {
  return pipe(lstat(filePath)).to(
    (_) => Task.map(_, fileTypeFromStats),
    (_) => Task.orElse(_, noneWhenNotFound),
    (_) =>
      Task.andThen(_, (linkType) =>
        Option.isNone(linkType)
          ? Task.map(mkdir(filePath, { recursive: true }), ignore)
          : ensureType(filePath, 'directory', linkType)
      )
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

function noneWhenNotFound(error: FileError): Task<Option<never>, FileError> {
  return error.code === 'ENOENT' ? Task.resolve(undefined) : Task.reject(error);
}

function ensureType(filePath: FilePath, expectedType: FileType, actualType: FileType): Task<void, FileError> {
  return actualType !== expectedType
    ? Task.reject(ensureTypeError(filePath, expectedType, actualType))
    : Task.resolve(undefined);
}

function ensureTypeError(filePath: FilePath, expectedType: FileType, actualType: FileType) {
  return FileError({
    fileErrorType: 'UserError',
    message: `Ensure path exists, expected '${expectedType}', got '${actualType}'`,
    path: filePath,
    syscall: Option.None,
    errno: Option.None,
    code: Option.None,
  });
}
