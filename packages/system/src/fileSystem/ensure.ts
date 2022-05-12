import { Task, Option, ignore, pipe } from '@w5s/core';
import { FilePath } from '../path';
import { FileError } from '../error';
import { lstat, mkdir, symlink, writeFile } from './fs';

type FileType = 'file' | 'directory' | 'symlink';

export function ensureDirectory(filePath: FilePath): Task<void, FileError> {
  return Task.andThen(linkStat(filePath), (linkType) =>
    Option.isNone(linkType)
      ? Task.map(mkdir(filePath, { recursive: true }), ignore)
      : ensureType(filePath, 'directory', linkType)
  );
}

export function ensureFile(filePath: FilePath): Task<void, FileError> {
  return Task.andThen(linkStat(filePath), (linkType) =>
    Option.isNone(linkType)
      ? Task.andThen(ensureDirectory(FilePath.dirname(filePath)), () => writeFile(filePath, new Uint8Array()))
      : ensureType(filePath, 'file', linkType)
  );
}

export function ensureSymbolicLink(source: FilePath, destination: FilePath): Task<void, FileError> {
  return Task.andThen(linkStat(destination), (destinationLinkType) =>
    Option.isNone(destinationLinkType)
      ? Task.andThen(ensureDirectory(FilePath.dirname(destination)), () => symlink(source, destination))
      : ensureType(destination, 'symlink', destinationLinkType)
  );
}

function linkStat(filePath: FilePath) {
  return pipe(lstat(filePath)).to(
    (_) =>
      Task.map(
        _,
        (stats): Option<FileType> =>
          stats.isFile() ? 'file' : stats.isDirectory() ? 'directory' : stats.isSymbolicLink() ? 'symlink' : Option.None
      ),
    (_) =>
      Task.orElse(
        _,
        (error: FileError): Task<Option<never>, FileError> =>
          error.code === 'ENOENT' ? Task.resolve(undefined) : Task.reject(error)
      )
  );
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
