import type { Option } from '@w5s/core';
import type { Task } from '@w5s/task';
import { FilePath } from '../FilePath.js';
import { FileError } from '../FileError.js';
import { ErrnoException, errnoTask, Internal } from '../Internal.js';

type FileType = 'file' | 'directory' | 'symlink';

export async function ensureDirectoryAsync(filePath: FilePath): Promise<void> {
  const linkType = await linkStat(filePath);
  if (linkType == null) {
    await Internal.FS.mkdir(filePath, { recursive: true });
  } else {
    ensureType(filePath, 'directory', linkType);
  }
}

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
  return errnoTask(ensureDirectoryAsync)(filePath);
}

export async function ensureFileAsync(filePath: FilePath): Promise<void> {
  const linkType = await linkStat(filePath);
  if (linkType == null) {
    await ensureDirectoryAsync(FilePath.dirname(filePath));
    await Internal.FS.writeFile(filePath, '');
  } else {
    ensureType(filePath, 'file', linkType);
  }
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
  return errnoTask(ensureFileAsync)(filePath);
}

export async function ensureSymbolicLinkAsync(source: FilePath, destination: FilePath): Promise<void> {
  const destinationLinkType = await linkStat(destination);
  if (destinationLinkType == null) {
    await ensureDirectoryAsync(FilePath.dirname(destination));
    await Internal.FS.symlink(source, destination);
  } else {
    ensureType(destination, 'symlink', destinationLinkType);
  }
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
  return errnoTask(ensureSymbolicLinkAsync)(source, destination);
}

async function linkStat(filePath: FilePath): Promise<Option<FileType>> {
  try {
    const stats = await Internal.FS.lstat(filePath);

    return stats.isFile() ? 'file' : stats.isDirectory() ? 'directory' : stats.isSymbolicLink() ? 'symlink' : undefined;
  } catch (error: unknown) {
    if ((error as ErrnoException).code === 'ENOENT') {
      return undefined;
    }
    throw error;
  }
}

function ensureType(filePath: FilePath, expectedType: FileType, actualType: FileType) {
  if (actualType !== expectedType) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw ensureTypeError(filePath, expectedType, actualType);
  }
}

function ensureTypeError(filePath: FilePath, expectedType: FileType, actualType: FileType) {
  return FileError({
    fileErrorType: 'UserError',
    message: `Ensure path exists, expected '${expectedType}', got '${actualType}'`,
    path: filePath,
    errno: undefined,
    code: undefined,
    syscall: undefined,
  });
}
