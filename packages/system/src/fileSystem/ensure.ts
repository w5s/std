import { Task, Option, ignore, pipe } from '@w5s/core';
import { FilePath } from '../filePath.js';
import { FileError } from '../error.js';
import { readSymbolicLinkStatus, createDirectory, createSymbolicLink, writeFile } from './fs.js';

type FileType = 'file' | 'directory' | 'symlink';

/**
 * Ensures that the directory exists. If the directory structure does not exist, it is created.
 *
 * @example
 * ```ts
 * const task = ensureDirectory(FilePath('/path/to/directory'));
 * await Task.unsafeRun(task);// Will create a directory
 * ```
 * @param filePath - The path to ensure
 */
export function ensureDirectory(filePath: FilePath): Task<void, FileError> {
  return Task.andThen(linkStat(filePath), (linkType) =>
    Option.isNone(linkType)
      ? Task.map(createDirectory(filePath, { recursive: true }), ignore)
      : ensureType(filePath, 'directory', linkType)
  );
}

/**
 * Ensures that the file exists. If the file that is requested to be created is in directories that do not exist, these directories are created. If the file already exists, it is NOT MODIFIED.
 *
 * @example
 * ```ts
 * const task = ensureFile(FilePath('/path/to/file'));
 * await Task.unsafeRun(task);// Will create a file
 * ```
 * @param filePath - The path to ensure
 */
export function ensureFile(filePath: FilePath): Task<void, FileError> {
  return Task.andThen(linkStat(filePath), (linkType) =>
    Option.isNone(linkType)
      ? Task.andThen(ensureDirectory(FilePath.dirname(filePath)), () => writeFile(filePath, ''))
      : ensureType(filePath, 'file', linkType)
  );
}

/**
 * Ensures that the symlink exists. If the directory structure does not exist, it is created.
 *
 * @example
 * ```ts
 * const task = ensureSymbolicLink(FilePath('/path/to/file'), FilePath('/path/to/link'));
 * await Task.unsafeRun(task);// Will create a symbolic link
 * ```
 * @param source - The source path
 * @param destination - The destination path
 */
export function ensureSymbolicLink(source: FilePath, destination: FilePath): Task<void, FileError> {
  return Task.andThen(linkStat(destination), (destinationLinkType) =>
    Option.isNone(destinationLinkType)
      ? Task.andThen(ensureDirectory(FilePath.dirname(destination)), () => createSymbolicLink(source, destination))
      : ensureType(destination, 'symlink', destinationLinkType)
  );
}

function linkStat(filePath: FilePath) {
  return pipe(readSymbolicLinkStatus(filePath)).to(
    (_) =>
      Task.map(
        _,
        (stats): Option<FileType> =>
          stats.isFile ? 'file' : stats.isDirectory ? 'directory' : stats.isSymbolicLink ? 'symlink' : Option.None
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
  return actualType === expectedType
    ? Task.resolve(undefined)
    : Task.reject(ensureTypeError(filePath, expectedType, actualType));
}

function ensureTypeError(filePath: FilePath, expectedType: FileType, actualType: FileType) {
  return FileError({
    fileErrorType: 'UserError',
    message: `Ensure path exists, expected '${expectedType}', got '${actualType}'`,
    path: filePath,
  });
}
