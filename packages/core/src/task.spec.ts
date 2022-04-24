/* eslint-disable jest/no-export */
/* eslint-disable max-classes-per-file */
import { assertType } from './assert.js';
import { Ref } from './ref.js';
import { Result } from './result.js';
import { Task } from './task.js';

const anyObject = { foo: true };
const anyOtherObject = { bar: true };
const anyError = new Error('TestError');
const waitMs = (ms: number) =>
  ms === 0
    ? Promise.resolve()
    : new Promise<void>((resolve) => {
        setTimeout(() => resolve(), ms);
      });
const taskResolve = <V, E>(
  sync: 'async' | 'sync',
  value: V,
  { cancel = () => {}, delay = 0 }: { cancel?: () => void; delay?: number } = {}
) =>
  sync === 'async'
    ? Task<V, E>(({ ok }) => ok(value))
    : Task<V, E>(async ({ ok, onCancel }) => {
        onCancel(cancel);
        await waitMs(delay);
        return ok(value);
      });
const taskReject = <V, E>(
  sync: 'async' | 'sync',
  value: E,
  { cancel = () => {}, delay = 0 }: { cancel?: () => void; delay?: number } = {}
) =>
  sync === 'async'
    ? Task<V, E>(({ error }) => error(value))
    : Task<V, E>(async ({ error, onCancel }) => {
        onCancel(cancel);
        await waitMs(delay);
        return error(value);
      });

namespace ExpectTask {
  export function run<Value, Error>(
    task: Task<Value, Error>
  ): Promise<{
    resolve: jest.Mocked<(value: Value) => void>;
    reject: jest.Mocked<(error: Error) => void>;
    initialCanceler: jest.Mocked<() => void>;
    cancelerRef: Ref<jest.Mocked<() => void>>;
  }> {
    return new Promise((resolve, _reject) => {
      const resolveTask = jest.fn();
      const rejectTask = jest.fn();
      const initialCanceler = jest.fn();
      const cancelerRef = Ref(initialCanceler);
      const returnValue = {
        resolve: resolveTask,
        reject: rejectTask,
        initialCanceler,
        cancelerRef,
      };

      task[Task.run](
        (value) => {
          resolveTask(value);
          resolve(returnValue);
        },
        (value) => {
          rejectTask(value);
          resolve(returnValue);
        },
        cancelerRef
      );
    });
  }

  export async function toResolve(task: Task<any, any>, value: any) {
    const runReport = await ExpectTask.run(task);
    expect(runReport.resolve).toHaveBeenCalledTimes(1);
    expect(runReport.resolve).toHaveBeenCalledWith(value);
    expect(runReport.reject).not.toHaveBeenCalled();
  }

  export async function toReject(task: Task<any, any>, value: any) {
    const runReport = await ExpectTask.run(task);
    expect(runReport.reject).toHaveBeenCalledTimes(1);
    expect(runReport.reject).toHaveBeenCalledWith(value);
    expect(runReport.resolve).not.toHaveBeenCalled();
  }
}

describe('Task', () => {
  const allSyncCombination = [
    ['sync', 'sync'],
    ['async', 'sync'],
    ['sync', 'async'],
    ['async', 'async'],
  ] as Array<['sync' | 'async', 'sync' | 'async']>;

  describe(Task.unsafeRun, () => {
    test('should run throwing task', () => {
      const task = Task(() => {
        throw anyError;
      });
      expect(() => Task.unsafeRun(task)).toThrow(anyError);
    });
    test('should return the result of task[Task.run]() for sync', () => {
      expect(Task.unsafeRun(Task(({ ok }) => ok(anyObject)))).toEqual(Result.Ok(anyObject));
    });
    test('should return the result of task[Task.run]() for async', async () => {
      await expect(
        Task.unsafeRun(
          Task(
            ({ ok }) =>
              new Promise<Result<typeof anyObject, never>>((resolve) => {
                setTimeout(() => resolve(ok(anyObject)), 0);
              })
          )
        )
      ).resolves.toEqual(Result.Ok(anyObject));
    });
    test('should run rejected task', async () => {
      const task = Task(() => Promise.reject(new Error('TestError')));
      await expect(Task.unsafeRun(task)).rejects.toEqual(new Error('TestError'));
    });
  });
  describe(Task.resolve, () => {
    test('should construct a sync task', async () => {
      const task = Task.resolve(anyObject);
      await ExpectTask.toResolve(task, anyObject);
    });
  });
  describe(Task.reject, () => {
    test('should construct a sync task', async () => {
      const task = Task.reject(anyError);
      await ExpectTask.toReject(task, anyError);
    });
  });
  describe(Task.tryCall, () => {
    class TestError extends Error {
      override name = 'TestError';

      constructor(public innerError: unknown = undefined) {
        super('TestMessage');
      }
    }
    test('should resolve(block()) when nothing is thrown', async () => {
      const task = Task.tryCall(
        () => 'return_value',
        () => new TestError()
      );
      await ExpectTask.toResolve(task, 'return_value');
    });
    test('should reject(onError(error)) when error is thrown', async () => {
      const thrownError = new Error('custom');
      const onError = jest.fn((_error: unknown) => new TestError());
      const task = Task.tryCall(() => {
        throw thrownError;
      }, onError);
      await ExpectTask.toReject(task, new TestError());
      expect(onError).toHaveBeenCalledWith(thrownError);
    });
    test('should return Result.Ok(block()) when nothing is thrown (async handler)', async () => {
      const task = Task.tryCall(
        async () => 'return_value',
        async (innerError) => new TestError(innerError)
      );
      await ExpectTask.toResolve(task, 'return_value');
    });
    test('should return Result.Ok(block()) when nothing is thrown (sync handler)', async () => {
      const task = Task.tryCall(
        () => 'return_value',
        async (innerError) => new TestError(innerError)
      );
      await ExpectTask.toResolve(task, 'return_value');
    });
    test('should return Result.Error(onError(error)) when promise is rejected (async handler)', async () => {
      const thrownError = new Error('custom');
      const onError = jest.fn(async (innerError: unknown) => new TestError(innerError));
      const task = Task.tryCall(() => Promise.reject(thrownError), onError);

      await ExpectTask.toReject(task, new TestError(thrownError));
      expect(onError).toHaveBeenCalledWith(thrownError);
    });
    test('should return Result.Error(onError(error)) when promise is rejected (sync handler)', async () => {
      const thrownError = new Error('custom');
      const onError = jest.fn((innerError: unknown) => new TestError(innerError));
      const task = Task.tryCall(() => Promise.reject(thrownError), onError);
      await ExpectTask.toReject(task, new TestError(thrownError));
      expect(onError).toHaveBeenCalledWith(thrownError);
    });
  });
  describe(Task.hasInstance, () => {
    test('should return false for any object', () => {
      expect(Task.hasInstance(true)).toEqual(false);
      expect(Task.hasInstance(null)).toEqual(false);
      expect(Task.hasInstance(() => true)).toEqual(false);
    });
    test('should return true for Task object', () => {
      const unknownValue: unknown = Task.resolve(anyObject);

      expect(Task.hasInstance(unknownValue)).toEqual(true);
      if (Task.hasInstance(unknownValue)) {
        assertType<typeof unknownValue, Task<unknown, unknown>>(true);
      }
    });
  });

  describe(Task, () => {
    describe('sync', () => {
      test('should construct a success sync task', async () => {
        const task = Task(({ ok }) => ok('foo'));
        expect(task).toEqual({
          [Task.run]: expect.any(Function),
        });

        const ref = Ref(() => {});
        const resolve = jest.fn();
        const reject = jest.fn();
        task[Task.run](resolve, reject, ref);
        expect(resolve).toHaveBeenCalledTimes(1);
        expect(resolve).toHaveBeenCalledWith('foo');
      });
      test('should construct a failure sync task', async () => {
        const task = Task<never, 'err'>(({ error }) => error('err'));
        expect(task).toEqual({
          [Task.run]: expect.any(Function),
        });

        const ref = Ref(() => {});
        const resolve = jest.fn();
        const reject = jest.fn();
        task[Task.run](resolve, reject, ref);
        expect(reject).toHaveBeenCalledTimes(1);
        expect(reject).toHaveBeenCalledWith('err');
      });
      test('should always set default canceler', () => {
        const task = Task(({ ok }) => ok(undefined));
        const ref = Ref(() => {});

        task[Task.run](
          () => {},
          () => {},
          ref
        );
        expect(Ref.read(ref)).toBe(Task.defaultCanceler);
      });
    });
    describe('async', () => {
      test('should construct an success async task', async () => {
        const task = Task(async ({ ok }) => ok('value'));
        expect(task).toEqual({
          [Task.run]: expect.any(Function),
        });
        const ref = Ref(() => {});
        const resolve = jest.fn();
        const reject = jest.fn();
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await task[Task.run](resolve, reject, ref);
        expect(resolve).toHaveBeenCalledTimes(1);
        expect(resolve).toHaveBeenCalledWith('value');
      });
      test('should set default canceler if omitted', () => {
        const task = Task(async ({ ok }) => ok(undefined));
        const ref = Ref(() => {});

        task[Task.run](
          () => {},
          () => {},
          ref
        );
        expect(Ref.read(ref)).toBe(Task.defaultCanceler);
      });

      test('should set canceler', () => {
        const canceler = () => {};
        const task = Task(async ({ ok, onCancel }) => {
          onCancel(canceler);

          return ok(undefined);
        });
        const ref = Ref(() => {});

        task[Task.run](
          () => {},
          () => {},
          ref
        );
        expect(Ref.read(ref)).toBe(canceler);
      });
    });
  });
  describe(Task.map, () => {
    test('should keep unchanged when failure', async () => {
      const task = taskReject<typeof anyObject, typeof anyError>('sync', anyError);
      const mapTask = Task.map(task, (_) => ({ ..._, bar: true }));

      await ExpectTask.toReject(mapTask, anyError);
    });
    test('should map value when success', async () => {
      const task = taskResolve('sync', anyObject);
      const mapTask = Task.map(task, (_) => ({ ..._, bar: true }));
      await ExpectTask.toResolve(mapTask, {
        ...anyObject,
        bar: true,
      });
    });
    test('should map value when async success', async () => {
      const task = taskResolve('async', anyObject);
      const mapTask = Task.map(task, (_) => ({ ..._, bar: true }));

      await ExpectTask.toResolve(mapTask, {
        ...anyObject,
        bar: true,
      });
    });
    test('should forward canceler', async () => {
      const task = taskResolve<typeof anyObject, typeof anyError>('async', anyObject);
      const mapTask = Task.map(task, (_) => _);
      jest.spyOn(task, Task.run);
      const runReport = await ExpectTask.run(mapTask);
      expect(task[Task.run]).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), runReport.cancelerRef);
    });
  });

  describe(Task.mapError, () => {
    test('should keep unchanged when success', async () => {
      const task = taskResolve<typeof anyObject, typeof anyError>('sync', anyObject);
      const mapTask = Task.mapError(task, (_) => ({ ..._, bar: true }));

      await ExpectTask.toResolve(mapTask, anyObject);
    });
    test('should map error when success', async () => {
      const task = taskReject<typeof anyObject, typeof anyError>('sync', anyError);
      const mapTask = Task.mapError(task, (_) => ({ ..._, bar: true }));

      await ExpectTask.toReject(mapTask, {
        ...anyError,
        bar: true,
      });
    });
    test('should map error when async failure', async () => {
      const task = taskReject('async', anyError);
      const mapTask = Task.mapError(task, (_) => ({ ..._, bar: true }));

      await ExpectTask.toReject(mapTask, {
        ...anyError,
        bar: true,
      });
    });
    test('should forward canceler', async () => {
      const task = taskResolve<typeof anyObject, typeof anyError>('async', anyObject);
      const mapTask = Task.mapError(task, (_) => _);
      jest.spyOn(task, Task.run);
      const runReport = await ExpectTask.run(mapTask);
      expect(task[Task.run]).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), runReport.cancelerRef);
    });
  });

  describe(Task.andThen, () => {
    describe.each(allSyncCombination)('(%s, () => %s)', (before, after) => {
      const stringify = (num: number) => taskResolve<string, 'TestError'>(after, String(num));

      test('should return unchanged result when failure', async () => {
        const task = taskReject<number, 'TestError'>(before, 'TestError');
        const thenTask = Task.andThen(task, stringify);

        await ExpectTask.toReject(thenTask, 'TestError');
      });
      test('should map value when success', async () => {
        const task = taskResolve<number, 'TestError'>(before, 4);
        const thenTask = Task.andThen(task, stringify);

        await ExpectTask.toResolve(thenTask, '4');
      });
    });

    test('should forward canceler', async () => {
      const task = taskResolve<typeof anyObject, typeof anyError>('async', anyObject);
      const afterTask = taskResolve<typeof anyObject, typeof anyError>('async', anyObject);
      const thenTask = Task.andThen(task, (_) => afterTask);
      jest.spyOn(task, Task.run);
      jest.spyOn(afterTask, Task.run);
      const runReport = await ExpectTask.run(thenTask);

      expect(task[Task.run]).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), runReport.cancelerRef);
      expect(afterTask[Task.run]).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
        runReport.cancelerRef
      );
    });
  });

  describe(Task.andRun, () => {
    describe.each(allSyncCombination)('(%s, () => %s)', (before, after) => {
      const task = taskResolve(before, anyObject);
      const andTask = taskResolve(after, anyOtherObject);

      test('should return a new task with same value', async () => {
        await ExpectTask.toResolve(
          Task.andRun(task, () => andTask),
          anyObject
        );
      });
      test('should call callback and run task', async () => {
        const taskCallbackRun = jest.fn(({ ok }) => ok(anyOtherObject));
        const taskCallback = Task(taskCallbackRun);
        await ExpectTask.run(Task.andRun(task, () => taskCallback));

        expect(taskCallbackRun).toHaveBeenCalled();
      });
      test('should call callback with task value', async () => {
        const callback = jest.fn(() => andTask);
        await ExpectTask.run(Task.andRun(task, callback));

        expect(callback).toHaveBeenCalledWith(anyObject);
      });
    });
  });

  describe(Task.orElse, () => {
    describe.each(allSyncCombination)('(%s, () => %s)', (before, after) => {
      const handleError = (message: string) => taskResolve<string, string>(after, `${message}_handled`);

      test('should return unchanged result when Result.Ok', async () => {
        const task = taskResolve<string, 'TestError'>(before, 'anyValue');
        const taskElse = Task.orElse(task, handleError);
        await ExpectTask.toResolve(taskElse, 'anyValue');
      });
      test('should map value when Result.Ok', async () => {
        const task = taskReject<string, 'TestError'>(before, 'TestError');
        const taskElse = Task.orElse(task, handleError);
        await ExpectTask.toResolve(taskElse, 'TestError_handled');
      });
    });

    test('should forward canceler', async () => {
      const task = taskReject<typeof anyObject, typeof anyError>('async', anyError);
      const afterTask = taskResolve<typeof anyObject, typeof anyError>('async', anyObject);
      const thenTask = Task.orElse(task, (_) => afterTask);
      jest.spyOn(task, Task.run);
      jest.spyOn(afterTask, Task.run);
      const runReport = await ExpectTask.run(thenTask);

      expect(task[Task.run]).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), runReport.cancelerRef);
      expect(afterTask[Task.run]).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
        runReport.cancelerRef
      );
    });
  });
});
