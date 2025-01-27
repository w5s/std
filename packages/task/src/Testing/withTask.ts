import { Ok } from '@w5s/core/dist/Result/Ok.js';
import { Error } from '@w5s/core/dist/Result/Error.js';
import type { ExpectFunction } from '@w5s/core-type';
import type { TaskLike } from '../Task.js';
import { run } from '../Task/run.js';

export interface ExpectTask {
  /**
   * Asserts that task resolve value asynchronously or synchronously
   *
   * @param value
   */
  toResolve(value: unknown): Promise<void>;
  /**
   * Asserts that task resolve value asynchronously
   *
   * @param value
   */
  toResolveAsync(value: unknown): Promise<void>;
  /**
   * Asserts that task resolve value synchronously
   *
   * @param value
   */
  toResolveSync(value: unknown): void;
  /**
   * Asserts that task rejects value asynchronously or synchronously
   *
   * @param value
   */
  toReject(value: unknown): Promise<void>;
  /**
   * Asserts that task rejects value asynchronously
   *
   * @param error
   */
  toRejectAsync(error: unknown): Promise<void>;
  /**
   * Asserts that task rejects value synchronously
   *
   * @param error
   */
  toRejectSync(error: unknown): void;
  /**
   * Asserts that task throws an error asynchronously or synchronously
   *
   * @param value
   */
  toThrow(value: unknown): Promise<void>;
  /**
   * Asserts that task throws an error asynchronously
   *
   * @param error
   */
  toThrowAsync(error: unknown): Promise<void>;
  /**
   * Asserts that task throw an error synchronously
   *
   * @param error
   */
  toThrowSync(error: unknown): void;
}

/**
 * Return a specialized expect for {@link @w5s/task!Task}
 *
 * @example
 * ```typescript
 * const expectTask = withTask(expect);
 *
 * const someTask: Task<any, any> = ...;
 * await expectTask(someTask).toResolve(...);
 * ```
 * @param expectFn - the expect function from the test library
 */
export function withTask(expectFn: ExpectFunction) {
  const create = <V, E>(task: TaskLike<V, E>, isNot: boolean): ExpectTask => ({
    async toResolve(value: V) {
      const getResult = async () => run(task);
      const expectValue = expectFn(getResult()).resolves;
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await (isNot ? expectValue.not : expectValue).toEqual(Ok(value));
    },
    async toResolveAsync(value: V) {
      const result = run(task);
      const expectValue = expectFn(result).resolves;
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await (isNot ? expectValue.not : expectValue).toEqual(Ok(value));
    },
    toResolveSync(value: V) {
      const result = run(task);
      const expectValue = expectFn(result);

      (isNot ? expectValue.not : expectValue).toEqual(Ok(value));
    },
    async toReject(error: E) {
      const getResult = async () => run(task);
      const expectValue = expectFn(getResult()).resolves;
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await (isNot ? expectValue.not : expectValue).toEqual(Error(error));
    },
    async toRejectAsync(error: E) {
      const result = run(task);
      const expectValue = expectFn(result).resolves; // The promise should be resolved with a Result.Error()
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await (isNot ? expectValue.not : expectValue).toEqual(Error(error));
    },
    toRejectSync(error: E) {
      const result = run(task);
      const expectValue = expectFn(result);

      (isNot ? expectValue.not : expectValue).toEqual(Error(error));
    },
    async toThrow(error: unknown) {
      const getResult = async () => run(task);
      const expectValue = expectFn(getResult()).rejects;

      // eslint-disable-next-line @typescript-eslint/await-thenable
      await (isNot ? expectValue.not : expectValue).toEqual(error);
    },
    toThrowSync(error: unknown) {
      const expectValue = expectFn(() => run(task));
      (isNot ? expectValue.not : expectValue).toThrow(error);
    },
    async toThrowAsync(error: unknown) {
      const expectValue = expectFn(run(task)).rejects;

      // eslint-disable-next-line @typescript-eslint/await-thenable
      await (isNot ? expectValue.not : expectValue).toEqual(error);
    },
  });

  return <V, E>(task: TaskLike<V, E>) =>
    Object.assign(create(task, false), {
      not: create(task, true),
    });
}
