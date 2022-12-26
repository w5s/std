import { pipe, Task } from '@w5s/core';
import { FileError } from '../error.js';
import { errnoTask, Internal } from '../internal.js';
import { FilePath } from '../filePath.js';
import { remove } from './remove.js';
import { readFileStatus } from './readFileStatus.js';

/**
 * Move a `source` file or directory to `destination`
 *
 * @example
 * ```ts
 * const moveTask = move(FilePath('source'), FilePath('destination'));
 * Task.unsafeRun(moveTask);
 * ```
 * @param source - The source path
 * @param destination - The destination path
 * @param options - The options to use
 */
export function move(source: FilePath, destination: FilePath, options?: move.Options): Task<void, FileError> {
  return Task.andThen(readFileStatus(source), (sourceStatus) =>
    sourceStatus.isDirectory && FilePath.isParentOf(source, destination)
      ? Task.reject(subdirectoryError(source, destination))
      : pipe(_exists(destination)).to(
          (_) =>
            Task.andThen(_, (existResult) =>
              existResult
                ? options?.overwrite === true
                  ? remove(destination, { recursive: true })
                  : Task.reject(alreadyExistError(destination))
                : Task.resolve(undefined)
            ),
          (_) => Task.andThen(_, () => errnoTask(Internal.FS.rename)(source, destination))
        )
  );
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
  });
}

function alreadyExistError(destination: FilePath) {
  return FileError({
    fileErrorType: 'UserError',
    message: 'Destination already exists',
    path: destination,
  });
}

export function _exists(filePath: FilePath): Task<boolean, FileError> {
  return errnoTask(async (path: string) => {
    try {
      await Internal.FS.access(path, Internal.FS.F_OK);
      return true;
    } catch {
      return false;
    }
  })(filePath);
}
