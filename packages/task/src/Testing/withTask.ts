import { Ok } from '@w5s/core/dist/Result/Ok.js';
import { Error } from '@w5s/core/dist/Result/Error.js';
import type { ExpectFunction } from '@w5s/core-type';
import type { TaskLike } from '../Task.js';
import { unsafeRun } from '../Task/unsafeRun.js';

export interface ExpectTask {
  toResolve(value: unknown): Promise<void>;
  toReject(error: unknown): Promise<void>;
}

export function withTask(expectFn: ExpectFunction) {
  const create = <V, E>(task: TaskLike<V, E>, isNot: boolean): ExpectTask => ({
    async toResolve(value: V) {
      const result = await unsafeRun(task);
      const expectValue = expectFn(result);
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await (isNot ? expectValue.not : expectValue).toEqual(Ok(value));
    },
    async toReject(error: E) {
      const result = await unsafeRun(task);
      const expectValue = expectFn(result);
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await (isNot ? expectValue.not : expectValue).toEqual(Error(error));
    },
  });

  return <V, E>(task: TaskLike<V, E>) =>
    Object.assign(create(task, false), {
      not: create(task, true),
    });
}
