/* eslint-disable jest/no-export */
/* eslint-disable max-classes-per-file */
import { assertType } from './assert.js';
import { Ref } from './ref.js';
import { Result } from './result.js';
import { runTask, Task } from './task.js';

const anyObject = { foo: true };
const anyOtherObject = { bar: true };
const anyError = { error: true };

namespace ExpectTask {
  export function runSync<Value, Error>(task: Task.Sync<Value, Error>) {
    const resolve = jest.fn();
    const reject = jest.fn();
    const initialCanceler = jest.fn();
    const cancelerRef = Ref(initialCanceler);
    task[Task.run](resolve, reject, cancelerRef);

    return {
      resolve,
      reject,
      initialCanceler,
      cancelerRef,
    };
  }

  export function runAsync<Value, Error>(
    task: Task.Async<Value, Error>
  ): Promise<{
    resolve: jest.Mocked<(value: Value) => void>;
    reject: jest.Mocked<(error: Error) => void>;
    initialCanceler: jest.Mocked<() => void>;
    cancelerRef: Ref<jest.Mocked<() => void>>;
  }> {
    return new Promise((resolve, _reject) => {
      const taskResolve = jest.fn();
      const taskReject = jest.fn();
      const initialCanceler = jest.fn();
      const cancelerRef = Ref(initialCanceler);
      const returnValue = {
        resolve: taskResolve,
        reject: taskReject,
        initialCanceler,
        cancelerRef,
      };

      task[Task.run](
        (value) => {
          taskResolve(value);
          resolve(returnValue);
        },
        (value) => {
          taskReject(value);
          resolve(returnValue);
        },
        cancelerRef
      );
    });
  }

  export async function toResolve(task: Task.Async<any, any>, value: any) {
    const runReport = await ExpectTask.runAsync(task);
    expect(runReport.resolve).toHaveBeenCalledTimes(1);
    expect(runReport.resolve).toHaveBeenCalledWith(value);
    expect(runReport.reject).not.toHaveBeenCalled();
  }

  export function toResolveSync(task: Task.Sync<any, any>, value: any) {
    const runReport = ExpectTask.runSync(task);
    expect(runReport.resolve).toHaveBeenCalledTimes(1);
    expect(runReport.resolve).toHaveBeenCalledWith(value);
    expect(runReport.reject).not.toHaveBeenCalled();
  }

  export async function toReject(task: Task.Async<any, any>, value: any) {
    const runReport = await ExpectTask.runAsync(task);
    expect(runReport.reject).toHaveBeenCalledTimes(1);
    expect(runReport.reject).toHaveBeenCalledWith(value);
    expect(runReport.resolve).not.toHaveBeenCalled();
  }

  export function toRejectSync(task: Task.Sync<any, any>, value: any) {
    const runReport = ExpectTask.runSync(task);
    expect(runReport.reject).toHaveBeenCalledTimes(1);
    expect(runReport.reject).toHaveBeenCalledWith(value);
    expect(runReport.resolve).not.toHaveBeenCalled();
  }
}

describe(runTask, () => {
  test('should return the result of task[Task.run]() for sync', () => {
    expect(runTask(Task.Sync(({ ok }) => ok(anyObject)))).toEqual(Result.Ok(anyObject));
  });
  test('should run throwing task', () => {
    const task = Task.Sync(() => {
      throw new Error('TestError');
    });
    expect(() => runTask(task)).toThrow(new Error('TestError'));
  });
  test('should return the result of task[Task.run]() for async', async () => {
    await expect(
      runTask(
        Task.Async(
          ({ ok }) =>
            new Promise<Task.Result<typeof anyObject, never>>((resolve) => {
              setTimeout(() => resolve(ok(anyObject)), 0);
            })
        )
      )
    ).resolves.toEqual(Result.Ok(anyObject));
  });
  test('should run rejected task', async () => {
    const task = Task.Async(() => Promise.reject(new Error('TestError')));
    await expect(runTask(task)).rejects.toEqual(new Error('TestError'));
  });
  test('should throw error when nothing is resolved or rejected', () => {
    const task = Task('sync', () => {});
    expect(() => runTask(task)).toThrow(new Error('Task was never resolved nor rejected'));
  });
});
describe('Task', () => {
  describe(Task.Sync, () => {
    test('should construct a success sync task', () => {
      const task = Task.Sync(({ ok }) => ok('foo'));
      expect(task).toEqual({
        [Task.type]: 'sync',
        [Task.run]: expect.any(Function),
      });

      const ref = Ref(() => {});
      const resolve = jest.fn();
      const reject = jest.fn();
      task[Task.run](resolve, reject, ref);
      expect(resolve).toHaveBeenCalledTimes(1);
      expect(resolve).toHaveBeenCalledWith('foo');
    });
    test('should construct a failure sync task', () => {
      const task = Task.Sync<never, 'err'>(({ error }) => error('err'));
      expect(task).toEqual({
        [Task.type]: 'sync',
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
      const task = Task.Sync(({ ok }) => ok(undefined));
      const ref = Ref(() => {});

      task[Task.run](
        () => {},
        () => {},
        ref
      );
      expect(Ref.read(ref)).toBe(Task.defaultCanceler);
    });

    describe(Task.Sync.resolve, () => {
      test('should construct a sync task', () => {
        const task = Task.Sync.resolve(anyObject);
        ExpectTask.toResolveSync(task, anyObject);
      });
    });
    describe(Task.Sync.reject, () => {
      test('should construct a sync task', () => {
        const task = Task.Sync.reject(anyError);
        ExpectTask.toRejectSync(task, anyError);
      });
    });
    describe(Task.Sync.hasInstance, () => {
      test('should return false for any object', () => {
        expect(Task.Sync.hasInstance(true)).toEqual(false);
        expect(Task.Sync.hasInstance(null)).toEqual(false);
        expect(Task.Sync.hasInstance(() => true)).toEqual(false);
        expect(Task.Sync.hasInstance(Task.Async.resolve(1))).toEqual(false);
      });
      test('should return true for Task object', () => {
        const unknownValue: unknown = Task.Sync.resolve(anyObject);

        expect(Task.Sync.hasInstance(unknownValue)).toEqual(true);
        if (Task.Sync.hasInstance(unknownValue)) {
          assertType<typeof unknownValue, Task.Sync<unknown, unknown>>(true);
        }
      });
    });
    describe(Task.Sync.tryCall, () => {
      class TestError extends Error {
        constructor() {
          super();
          this.name = 'TestError';
        }

        override name = 'TestError';
      }
      test('should resolve(block()) when nothing is thrown', () => {
        const task = Task.Sync.tryCall(
          () => 'return_value',
          () => new TestError()
        );
        ExpectTask.toResolveSync(task, 'return_value');
      });
      test('should reject(onError(error)) when error is thrown', () => {
        const thrownError = new Error('custom');
        const onError = jest.fn((_error: unknown) => new TestError());
        const task = Task.Sync.tryCall(() => {
          throw thrownError;
        }, onError);
        ExpectTask.toRejectSync(task, new TestError());
        expect(onError).toHaveBeenCalledWith(thrownError);
      });
    });
  });
  describe(Task.Async, () => {
    test('should construct an success async task', async () => {
      const task = Task.Async(({ ok }) => ok('value'));
      expect(task).toEqual({
        [Task.type]: 'async',
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
      const task = Task.Async(({ ok }) => ok(undefined));
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
      const task = Task.Async(({ ok, onCancel }) => {
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

    describe(Task.Async.resolve, () => {
      test('should construct an async task', async () => {
        const task = Task.Async.resolve(anyObject);
        await ExpectTask.toResolve(task, anyObject);
      });
    });
    describe(Task.Async.reject, () => {
      test('should construct an async task', async () => {
        const task = Task.Async.reject(anyError);
        await ExpectTask.toReject(task, anyError);
      });
    });
    describe(Task.Async.hasInstance, () => {
      test('should return false for any object', () => {
        expect(Task.Async.hasInstance(true)).toEqual(false);
        expect(Task.Async.hasInstance(null)).toEqual(false);
        expect(Task.Async.hasInstance(() => true)).toEqual(false);
        expect(Task.Async.hasInstance(Task.Sync.resolve(1))).toEqual(false);
      });
      test('should return true for Task object', () => {
        const unknownValue: unknown = Task.Async.resolve(anyObject);

        expect(Task.Async.hasInstance(unknownValue)).toEqual(true);
        if (Task.Async.hasInstance(unknownValue)) {
          assertType<typeof unknownValue, Task.Async<unknown, unknown>>(true);
        }
      });
    });
    describe(Task.Async.tryCall, () => {
      class TestError extends Error {
        override name = 'TestError';

        constructor(public innerError: unknown) {
          super('TestMessage');
        }
      }

      test('should return Result.Ok(block()) when nothing is thrown (async handler)', async () => {
        const task = Task.Async.tryCall(
          async () => 'return_value',
          async (innerError) => new TestError(innerError)
        );
        await ExpectTask.toResolve(task, 'return_value');
      });
      test('should return Result.Ok(block()) when nothing is thrown (sync handler)', async () => {
        const task = Task.Async.tryCall(
          () => 'return_value',
          async (innerError) => new TestError(innerError)
        );
        await ExpectTask.toResolve(task, 'return_value');
      });
      test('should return Result.Error(onError(error)) when promise is rejected (async handler)', async () => {
        const thrownError = new Error('custom');
        const onError = jest.fn(async (innerError: unknown) => new TestError(innerError));
        const task = Task.Async.tryCall(() => Promise.reject(thrownError), onError);

        await ExpectTask.toReject(task, new TestError(thrownError));
        expect(onError).toHaveBeenCalledWith(thrownError);
      });
      test('should return Result.Error(onError(error)) when promise is rejected (sync handler)', async () => {
        const thrownError = new Error('custom');
        const onError = jest.fn((innerError: unknown) => new TestError(innerError));
        const task = Task.Async.tryCall(() => Promise.reject(thrownError), onError);
        await ExpectTask.toReject(task, new TestError(thrownError));
        expect(onError).toHaveBeenCalledWith(thrownError);
      });
    });
  });
  describe(Task.map, () => {
    test('should keep unchanged when failure', () => {
      const task = Task.Sync.reject<typeof anyObject, typeof anyError>(anyError);
      const mapTask = Task.map(task, (_) => ({ ..._, bar: true }));

      ExpectTask.toRejectSync(mapTask, anyError);
    });
    test('should map value when success', () => {
      const task = Task.Sync.resolve(anyObject);
      const mapTask = Task.map(task, (_) => ({ ..._, bar: true }));
      ExpectTask.toResolveSync(mapTask, {
        ...anyObject,
        bar: true,
      });
    });
    test('should map value when async success', async () => {
      const task = Task.Async.resolve(anyObject);
      const mapTask = Task.map(task, (_) => ({ ..._, bar: true }));

      await ExpectTask.toResolve(mapTask, {
        ...anyObject,
        bar: true,
      });
    });
    test('should forward canceler', () => {
      const task = Task.Sync.resolve<typeof anyObject, typeof anyError>(anyObject);
      const mapTask = Task.map(task, (_) => _);
      jest.spyOn(task, Task.run);
      const runReport = ExpectTask.runSync(mapTask);
      expect(task[Task.run]).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), runReport.cancelerRef);
    });
  });

  describe(Task.mapError, () => {
    test('should keep unchanged when success', () => {
      const task = Task.Sync.resolve<typeof anyObject, typeof anyError>(anyObject);
      const mapTask = Task.mapError(task, (_) => ({ ..._, bar: true }));

      ExpectTask.toResolveSync(mapTask, anyObject);
    });
    test('should map error when success', () => {
      const task = Task.Sync.reject<typeof anyObject, typeof anyError>(anyError);
      const mapTask = Task.mapError(task, (_) => ({ ..._, bar: true }));

      ExpectTask.toRejectSync(mapTask, {
        ...anyError,
        bar: true,
      });
    });
    test('should map error when async failure', async () => {
      const task = Task.Async.reject(anyError);
      const mapTask = Task.mapError(task, (_) => ({ ..._, bar: true }));

      await ExpectTask.toReject(mapTask, {
        ...anyError,
        bar: true,
      });
    });
    test('should forward canceler', () => {
      const task = Task.Sync.resolve<typeof anyObject, typeof anyError>(anyObject);
      const mapTask = Task.mapError(task, (_) => _);
      jest.spyOn(task, Task.run);
      const runReport = ExpectTask.runSync(mapTask);
      expect(task[Task.run]).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), runReport.cancelerRef);
    });
  });

  describe(Task.andThen, () => {
    describe('sync then sync', () => {
      const stringify = (num: number) => Task.Sync.resolve<string, 'TestError'>(String(num));
      test('should return unchanged result when failure', () => {
        const task = Task.Sync.reject<number, 'TestError'>('TestError');
        const thenTask = Task.andThen(task, stringify);

        ExpectTask.toRejectSync(thenTask, 'TestError');
      });
      test('should map value when success', () => {
        const task = Task.Sync.resolve<number, 'TestError'>(4);
        const thenTask = Task.andThen(task, stringify);

        ExpectTask.toResolveSync(thenTask, '4');
      });
    });
    describe('async then async', () => {
      const stringify = (num: number) => Task.Async.resolve<string, 'TestError'>(String(num));

      test('should return unchanged result when Result.Error', async () => {
        const task = Task.Async.reject<number, 'TestError'>('TestError');
        const thenTask = Task.andThen(task, stringify);
        await ExpectTask.toReject(thenTask, 'TestError');
      });
      test('should map value when Result.Ok', async () => {
        const task = Task.Async.resolve<number, 'TestError'>(4);
        const thenTask = Task.andThen(task, stringify);
        await ExpectTask.toResolve(thenTask, '4');
      });
    });
    describe('async then sync', () => {
      const stringify = (num: number) => Task.Sync.resolve<string, 'TestError'>(String(num));

      test('should return unchanged result when Result.Error', async () => {
        const task = Task.Async.reject<number, 'TestError'>('TestError');
        const thenTask = Task.andThen(task, stringify);
        await ExpectTask.toReject(thenTask, 'TestError');
      });
      test('should map value when Result.Ok', async () => {
        const task = Task.Async.resolve<number, 'TestError'>(4);
        const thenTask = Task.andThen(task, stringify);
        await ExpectTask.toResolve(thenTask, '4');
      });
    });
    describe('sync then async', () => {
      test('should return type error', () => {
        const task = Task.Sync.resolve(anyObject);
        const thenTask = Task.Async.resolve(anyObject);
        // @ts-expect-error async != sync
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const resultTask = Task.andThen(task, () => thenTask);
      });
    });

    test('should forward canceler', () => {
      const task = Task.Sync.resolve<typeof anyObject, typeof anyError>(anyObject);
      const afterTask = Task.Sync.resolve<typeof anyObject, typeof anyError>(anyObject);
      const thenTask = Task.andThen(task, (_) => afterTask);
      jest.spyOn(task, Task.run);
      jest.spyOn(afterTask, Task.run);
      const runReport = ExpectTask.runSync(thenTask);

      expect(task[Task.run]).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), runReport.cancelerRef);
      expect(afterTask[Task.run]).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
        runReport.cancelerRef
      );
    });
  });

  describe(Task.andRun, () => {
    describe('sync then sync', () => {
      const task = Task.Sync.resolve(anyObject);
      const andTask = Task.Sync.resolve(anyOtherObject);

      test('should return a new task with same value', () => {
        ExpectTask.toResolveSync(
          Task.andRun(task, () => andTask),
          anyObject
        );
      });
      test('should call callback and run task', () => {
        const taskCallbackRun = jest.fn(({ ok }) => ok(anyOtherObject));
        const taskCallback = Task.Sync(taskCallbackRun);
        ExpectTask.runSync(Task.andRun(task, () => taskCallback));

        expect(taskCallbackRun).toHaveBeenCalled();
      });
      test('should call callback with task value', () => {
        const callback = jest.fn(() => andTask);
        ExpectTask.runSync(Task.andRun(task, callback));

        expect(callback).toHaveBeenCalledWith(anyObject);
      });
    });
    describe('sync then async', () => {
      const task = Task.Sync.resolve(anyObject);
      const andTask = Task.Async.resolve(anyOtherObject);
      test('should return type error', () => {
        // @ts-expect-error async != sync
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const resultTask = Task.andRun(task, () => andTask);
      });
    });
    describe('async then sync', () => {
      const task = Task.Async.resolve(anyObject);
      const andTask = Task.Sync.resolve(anyOtherObject);
      test('should return a new task with same value', async () => {
        await ExpectTask.toResolve(
          Task.andRun(task, () => andTask),
          anyObject
        );
      });
      test('should call callback and run task', async () => {
        const taskCallbackRun = jest.fn(({ ok }) => ok(anyOtherObject));
        const taskCallback = Task.Sync(taskCallbackRun);
        await ExpectTask.runAsync(Task.andRun(task, () => taskCallback));

        expect(taskCallbackRun).toHaveBeenCalled();
      });
      test('should call callback with task value', async () => {
        const callback = jest.fn(() => andTask);
        await ExpectTask.runAsync(Task.andRun(task, callback));

        expect(callback).toHaveBeenCalledWith(anyObject);
      });
    });
    describe('async then async', () => {
      const task = Task.Async.resolve(anyObject);
      const andTask = Task.Async.resolve(anyOtherObject);
      test('should return a new task with same value', async () => {
        await ExpectTask.toResolve(
          Task.andRun(task, () => andTask),
          anyObject
        );
      });
      test('should call callback and run task', async () => {
        const taskCallbackRun = jest.fn(({ ok }) => ok(anyOtherObject));
        const taskCallback = Task.Async(taskCallbackRun);
        await ExpectTask.runAsync(Task.andRun(task, () => taskCallback));

        expect(taskCallbackRun).toHaveBeenCalled();
      });
      test('should call callback with task value', async () => {
        const callback = jest.fn(() => andTask);
        await ExpectTask.runAsync(Task.andRun(task, callback));

        expect(callback).toHaveBeenCalledWith(anyObject);
      });
    });
  });

  describe(Task.orElse, () => {
    describe('sync then sync', () => {
      const handleError = (message: string) => Task.Sync.resolve<string, string>(`${message}_handled`);
      test('should return unchanged result when Result.Ok', () => {
        const task = Task.Sync.resolve<string, 'TestError'>('anyValue');
        const taskElse = Task.orElse(task, handleError);
        ExpectTask.toResolveSync(taskElse, 'anyValue');
      });
      test('should map value when Result.Ok', () => {
        const task = Task.Sync.reject<string, 'TestError'>('TestError');
        const taskElse = Task.orElse(task, handleError);
        ExpectTask.toResolveSync(taskElse, 'TestError_handled');
      });
    });
    describe('async then async', () => {
      const handleError = (message: string) => Task.Async.resolve<string, string>(`${message}_handled`);
      test('should return unchanged result when Result.Ok', async () => {
        const task = Task.Async.resolve<string, 'TestError'>('anyValue');
        const taskElse = Task.orElse(task, handleError);
        await ExpectTask.toResolve(taskElse, 'anyValue');
      });
      test('should map value when Result.Ok', async () => {
        const task = Task.Async.reject<string, 'TestError'>('TestError');
        const taskElse = Task.orElse(task, handleError);
        await ExpectTask.toResolve(taskElse, 'TestError_handled');
      });
    });
    describe('async then sync', () => {
      const handleError = (message: string) => Task.Async.resolve<string, string>(`${message}_handled`);
      test('should return unchanged result when Result.Ok', async () => {
        const task = Task.Async.resolve<string, 'TestError'>('anyValue');
        const taskElse = Task.orElse(task, handleError);
        await ExpectTask.toResolve(taskElse, 'anyValue');
      });
      test('should map value when Result.Ok', async () => {
        const task = Task.Async.reject<string, 'TestError'>('TestError');
        const taskElse = Task.orElse(task, handleError);
        await ExpectTask.toResolve(taskElse, 'TestError_handled');
      });
    });
    describe('sync then async', () => {
      test('should return type error', () => {
        // @ts-expect-error async != sync
        Task.orElse(Task.Sync.resolve(anyObject), () => Task.Async.resolve(anyObject));
      });
    });

    test('should forward canceler', () => {
      const task = Task.Sync.reject<typeof anyObject, typeof anyError>(anyError);
      const afterTask = Task.Sync.resolve<typeof anyObject, typeof anyError>(anyObject);
      const thenTask = Task.orElse(task, (_) => afterTask);
      jest.spyOn(task, Task.run);
      jest.spyOn(afterTask, Task.run);
      const runReport = ExpectTask.runSync(thenTask);

      expect(task[Task.run]).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), runReport.cancelerRef);
      expect(afterTask[Task.run]).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
        runReport.cancelerRef
      );
    });
  });
});
