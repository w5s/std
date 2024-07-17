import type { Task } from '@w5s/task';
import { from as taskFrom } from '@w5s/task/dist/Task/from.js';
import type { FileError } from './FileError.js';
import { errnoTaskSync, Internal } from './Internal.js';
import type { FilePath } from './FilePath.js';

export namespace Process {
  /**
   * Exits the process with the specified exit `code`.
   *
   * @example
   * ```ts
   * const exitTask = Process.exit(0);
   * Task.unsafeRun(exitTask);// Will exit program with code 0
   * ```
   * @param code - the exit code
   */
  export function exit(code: number): Task<never, never> {
    return taskFrom(({ resolve }) => resolve(Internal.Process.exit(code)));
  }

  /**
   * Returns the current working directory of the process
   *
   * @example
   * ```ts
   * const task = Process.getCurrentDirectory();
   * Task.unsafeRun(task);// Result.Ok(FilePath('current/working/directory'))
   * ```
   */
  export function getCurrentDirectory(): Task<FilePath, never> {
    return taskFrom(({ resolve }) => resolve(Internal.Process.cwd() as FilePath));
  }

  /**
   * Sets the current working directory of the process or rejects an error if doing so fails (for instance, if the specified `directory` does not exist).
   *
   * @example
   * ```ts
   * const task = Process.setCurrentDirectory(FilePath('other/directory'));
   * Task.unsafeRun(task);// Result.Ok(undefined)
   * ```
   * @param directory - the directory to set as the current working directory
   */
  export function setCurrentDirectory(directory: FilePath): Task<void, FileError> {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    return errnoTaskSync(Internal.Process.chdir)(directory);
  }
}
