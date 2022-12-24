import { ignore, pipe, Task } from '@w5s/core';
import { FileError } from '../error.js';
import { createDirectory } from './createDirectory.js';
import { listDirectory } from './listDirectory.js';
import { remove } from './remove.js';
import { FilePath } from '../filePath.js';

/**
 * Ensures that a directory is empty. Deletes directory contents if the directory is not empty. If the directory does not exist, it is created. The directory itself is not deleted.
 *
 * @example
 * ```ts
 * const task = emptyDirectory(FilePath('/path/to/directory'));
 * await Task.unsafeRun(task);// Will delete directory contents
 * ```
 * @param filePath - The directory to empty
 */
export function emptyDirectory(filePath: FilePath): Task<void, FileError> {
  return pipe(listDirectory(filePath)).to(
    (_) =>
      Task.andThen(_, (items) =>
        Task.all(
          items.map((item) =>
            remove(FilePath.join(filePath, item), {
              force: true,
              recursive: true,
            })
          )
        )
      ),
    (_) => Task.orElse(_, () => createDirectory(filePath, { recursive: true })),
    (_) => Task.map(_, ignore)
  );
}
