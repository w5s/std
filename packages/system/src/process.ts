import { Task } from '@w5s/core';
import * as nodeProcess from 'node:process';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const __nodeProcess__ = { ...nodeProcess };

export namespace Process {
  /**
   * Exits the process with the specified exit `code`.
   *
   * @example
   * ```ts
   * const exitTask = Process.exit(0);
   * Task.unsafeRun(exitTask);// Will exit program with code 0
   * ```
   * @param code the exit code
   */
  export function exit(code: number): Task<never, never> {
    return Task(({ ok }) => ok(__nodeProcess__.exit(code)));
  }
}
