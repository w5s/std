import type { Task } from '@w5s/core';
import type { FileError } from './error.js';
import { errnoTaskSync, Internal } from './internal.js';
import type { FilePath } from './filePath.js';

export namespace Process {
  /**
   * Exits the process with the specified exit `code`.
   *
   * @example
   * ```ts
   * const exitTask = Process.exit(0);
   * unsafeRun(exitTask);// Will exit program with code 0
   * ```
   * @param code - the exit code
   */
  export function exit(code: number): Task<never, never> {
    return { taskRun: (resolve) => resolve(Internal.Process.exit(code)) };
  }

  /**
   * Returns the current working directory of the process
   *
   * @example
   * ```ts
   * const task = Process.getCurrentDirectory();
   * unsafeRun(task);// Result.Ok(FilePath('current/working/directory'))
   * ```
   */
  export function getCurrentDirectory(): Task<FilePath, never> {
    return { taskRun: (resolve) => resolve(Internal.Process.cwd() as FilePath) };
  }

  /**
   * Sets the current working directory of the process or rejects an error if doing so fails (for instance, if the specified `directory` does not exist).
   *
   * @example
   * ```ts
   * const task = Process.setCurrentDirectory(FilePath('other/directory'));
   * unsafeRun(task);// Result.Ok(undefined)
   * ```
   * @param directory - the directory to set as the current working directory
   */
  export function setCurrentDirectory(directory: FilePath): Task<void, FileError> {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    return errnoTaskSync(Internal.Process.chdir)(directory);
  }
}
