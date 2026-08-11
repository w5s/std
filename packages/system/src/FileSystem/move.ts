import type { Task } from '@w5s/task';

import { FileError } from '../FileError.js';
import { FilePath } from '../FilePath.js';
import { errnoTask, Internal } from '../Internal.js';

/**
 * Move a `source` file or directory to `destination`
 *
 * @example
 * ```typescript
 * const moveTask = move(FilePath('source'), FilePath('destination'));
 * Task.run(moveTask);
 * ```
 * @param source The source path
 * @param destination The destination path
 * @param options The options to use
 */
export function move(source: FilePath, destination: FilePath, options?: move.Options): Task<void, FileError> {
  return errnoTask(moveAsync)(source, destination, options);
}

export async function moveAsync(source: FilePath, destination: FilePath, options?: move.Options): Promise<void> {
  const sourceStatus = await Internal.FS.stat(source);
  if (sourceStatus.isDirectory() && FilePath.isParentOf(source, destination)) {
    // eslint-disable-next-line ts/only-throw-error
    throw subdirectoryError(source, destination);
  }
  const existResult = await existsAsync(destination);
  if (existResult) {
    if (options?.overwrite === true) {
      await Internal.FS.rm(destination, { recursive: true });
    } else {
      // eslint-disable-next-line ts/only-throw-error
      throw alreadyExistError(destination);
    }
  }

  await Internal.FS.rename(source, destination);
}
export namespace move {
  export interface Options {
    /**
     * If `true`, the destination is overwritten if it exists.
     */
    overwrite?: boolean;
  }
}

function alreadyExistError(destination: FilePath) {
  return new FileError({
    code: undefined,
    errno: undefined,
    fileErrorType: 'UserError',
    message: 'Destination already exists',
    path: destination,
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

function subdirectoryError(source: FilePath, destination: FilePath) {
  return new FileError({
    code: undefined,
    errno: undefined,
    fileErrorType: 'UserError',
    message: `Cannot move '${source}' to a subdirectory of itself, '${destination}'.`,
    path: destination,
    syscall: undefined,
  });
}
