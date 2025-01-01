import type { Task } from '@w5s/task';
import { Internal, errnoTask } from '../Internal.js';
import type { FileError } from '../FileError.js';
import type { FilePath } from '../FilePath.js';

export async function emptyDirectoryAsync(path: string): Promise<void> {
  try {
    const items = await Internal.FS.readdir(path);
    await Promise.all(
      items.map((item) =>
        Internal.FS.rm(Internal.Path.join(path, item), {
          force: true,
          recursive: true,
        }),
      ),
    );
  } catch {
    await Internal.FS.mkdir(path, { recursive: true });
  }
}

/**
 * Ensures that a directory is empty. Deletes directory contents if the directory is not empty. If the directory does not exist, it is created. The directory itself is not deleted.
 *
 * @example
 * ```typescript
 * const task = emptyDirectory(FilePath('/path/to/directory'));
 * await Task.unsafeRun(task);// Will delete directory contents
 * ```
 * @param filePath - The directory to empty
 */
export function emptyDirectory(filePath: FilePath): Task<void, FileError> {
  return errnoTask(emptyDirectoryAsync)(filePath);
}
