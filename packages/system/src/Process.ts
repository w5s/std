import type { Task } from '@w5s/task';
import { from as taskFrom } from '@w5s/task/dist/Task/from.js';
import type { FileError } from './FileError.js';
import { errnoTaskSync } from './Internal.js';
import type { FilePath } from './FilePath.js';

/**
 * @namespace
 */
export const Process = {
  /**
   * Exits the process with the specified exit `code`.
   *
   * @example
   * ```typescript
   * const exitTask = Process.exit(0);
   * Task.run(exitTask);// Will exit program with code 0
   * ```
   * @param code - the exit code
   */
  exit(code: number): Task<never, never> {
    return taskFrom(({ resolve }) => resolve(process.exit(code)));
  },

  /**
   * Returns the current working directory of the process
   *
   * @example
   * ```typescript
   * const task = Process.getCurrentDirectory();
   * Task.run(task);// Result.Ok(FilePath('current/working/directory'))
   * ```
   */
  getCurrentDirectory(): Task<FilePath, never> {
    return taskFrom(({ resolve }) => resolve(process.cwd() as FilePath));
  },

  /**
   * Sets the current working directory of the process or rejects an error if doing so fails (for instance, if the specified `directory` does not exist).
   *
   * @example
   * ```typescript
   * const task = Process.setCurrentDirectory(FilePath('other/directory'));
   * Task.run(task);// Result.Ok(undefined)
   * ```
   * @param directory - the directory to set as the current working directory
   */
  setCurrentDirectory(directory: FilePath): Task<void, FileError> {
    // eslint-disable-next-line @typescript-eslint/unbound-method, n/no-sync
    return errnoTaskSync(process.chdir)(directory);
  },
};
