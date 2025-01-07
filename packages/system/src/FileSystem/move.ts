import type { Task } from '@w5s/task';
import { FileError } from '../FileError.js';
import { errnoTask, Internal } from '../Internal.js';
import { FilePath } from '../FilePath.js';

export async function moveAsync(source: FilePath, destination: FilePath, options?: move.Options): Promise<void> {
  const sourceStatus = await Internal.FS.stat(source);
  if (sourceStatus.isDirectory() && FilePath.isParentOf(source, destination)) {
    throw subdirectoryError(source, destination);
  }
  const existResult = await existsAsync(destination);
  if (existResult) {
    if (options?.overwrite === true) {
      await Internal.FS.rm(destination, { recursive: true });
    } else {
      throw alreadyExistError(destination);
    }
  }

  await Internal.FS.rename(source, destination);
}

/**
 * Move a `source` file or directory to `destination`
 *
 * @example
 * ```typescript
 * const moveTask = move(FilePath('source'), FilePath('destination'));
 * Task.unsafeRun(moveTask);
 * ```
 * @param source - The source path
 * @param destination - The destination path
 * @param options - The options to use
 */
export function move(source: FilePath, destination: FilePath, options?: move.Options): Task<void, FileError> {
  return errnoTask(moveAsync)(source, destination, options);
}
export namespace move {
  export type Options = {
    /**
     * If `true`, the destination is overwritten if it exists.
     */
    overwrite?: boolean;
  };
}

function subdirectoryError(source: FilePath, destination: FilePath) {
  return FileError({
    fileErrorType: 'UserError',
    path: destination,
    message: `Cannot move '${source}' to a subdirectory of itself, '${destination}'.`,
    errno: undefined,
    code: undefined,
    syscall: undefined,
  });
}

function alreadyExistError(destination: FilePath) {
  return FileError({
    fileErrorType: 'UserError',
    message: 'Destination already exists',
    path: destination,
    errno: undefined,
    code: undefined,
    syscall: undefined,
  });
}

async function existsAsync(filePath: FilePath): Promise<boolean> {
  try {
    await Internal.FS.access(filePath, Internal.FS.F_OK);
    return true;
  } catch {
    return false;
  }
}
