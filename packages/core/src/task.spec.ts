/* eslint-disable jest/no-export */
/* eslint-disable max-classes-per-file */
import { describe, test, expect, jest } from '@jest/globals';
import type { Mocked } from 'jest-mock';
import { assertType } from './type.js';
import { AggregateError } from './error/aggregateError.js';
import { throwError } from './prelude.js';
import { Ref } from './ref.js';
import { Result } from './result.js';
import { Task } from './task.js';

const anyObject = Object.freeze({ foo: true });
const anyOtherObject = { bar: true };
const anyError = new Error('TestError');
const waitMs = (ms: number) =>
  ms === 0
    ? Promise.resolve()
    : new Promise<void>((resolve) => {
        setTimeout(() => resolve(), ms);
      });

const generateTask = <V = never, E = never>(
  options: {
    canceler?: () => void;
    delayMs?: number;
  } & ({ value: V } | { error: E } | { throwError: unknown })
) => {
  const { canceler = () => {} } = options;
  const isAsync = options.delayMs != null && options.delayMs >= 0;

  return isAsync !== true
    ? Task<V, E>(({ ok: resultOk, error: resultError }) =>
        'value' in options
          ? resultOk(options.value)
          : 'error' in options
          ? resultError(options.error)
          : throwError(options.throwError)
      )
    : Task<V, E>(async ({ ok: resultOk, error: resultError, setCanceler }) => {
        setCanceler(canceler);
        await waitMs(options.delayMs ?? 0);
        return 'value' in options
          ? resultOk(options.value)
          : 'error' in options
          ? resultError(options.error)
          : throwError(options.throwError);
      });
};

namespace ExpectTask {
  export function run<Value, Error>(
    task: Task<Value, Error>
  ): {
    resolve: Mocked<(value: Value) => void>;
    reject: Mocked<(error: Error) => void>;
    initialCanceler: Mocked<() => void>;
    cancelerRef: Ref<Mocked<() => void>>;
    finished: Promise<void>;
  } {
    const resolveTask = jest.fn();
    const rejectTask = jest.fn();
    const initialCanceler = jest.fn();
    const cancelerRef = Ref(initialCanceler);
    return {
      resolve: resolveTask,
      reject: rejectTask,
      initialCanceler,
      cancelerRef,
      finished: new Promise((resolve, _reject) => {
        task.taskRun(
          (value) => {
            resolveTask(value);
            resolve();
          },
          (value) => {
            rejectTask(value);
            resolve();
          },
          cancelerRef
        );
      }),
    };
  }

  export async function toResolve(task: Task<any, any>, value: any) {
    const runReport = ExpectTask.run(task);
    await runReport.finished;
    expect(runReport.resolve).toHaveBeenCalledTimes(1);
    expect(runReport.resolve).toHaveBeenCalledWith(value);
    expect(runReport.reject).not.toHaveBeenCalled();
  }

  export async function toReject(task: Task<any, any>, value: any) {
    const runReport = ExpectTask.run(task);
    await runReport.finished;
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
    test('should return the result of task.taskRun() for sync', () => {
      expect(Task.unsafeRun(Task(({ ok }) => ok(anyObject)))).toEqual(Result.Ok(anyObject));
    });
    test('should return the result of task.taskRun() for async', async () => {
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
  describe(Task.unsafeRunOk, () => {
    test('should run throwing task', () => {
      const task = generateTask({ throwError: anyError });

      expect(() => Task.unsafeRunOk(task)).toThrow(anyError);
    });
    test('should return the result of task.taskRun() for sync', () => {
      const task = generateTask({ value: anyObject });

      expect(Task.unsafeRunOk(task)).toEqual(anyObject);
    });
    test('should return the result of task.taskRun() for async', async () => {
      const task = generateTask({ value: anyObject, delayMs: 1 });

      await expect(Task.unsafeRunOk(task)).resolves.toEqual(anyObject);
    });
    test('should run rejected task', async () => {
      const task = Task(() => Promise.reject(new Error('TestError')));
      await expect(Task.unsafeRunOk(task)).rejects.toEqual(new Error('TestError'));
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
          taskRun: expect.any(Function),
        });

        const ref = Ref(() => {});
        const resolve = jest.fn();
        const reject = jest.fn();
        task.taskRun(resolve, reject, ref);
        expect(resolve).toHaveBeenCalledTimes(1);
        expect(resolve).toHaveBeenCalledWith('foo');
      });
      test('should construct a failure sync task', async () => {
        const task = Task<never, 'err'>(({ error }) => error('err'));
        expect(task).toEqual({
          taskRun: expect.any(Function),
        });

        const ref = Ref(() => {});
        const resolve = jest.fn();
        const reject = jest.fn();
        task.taskRun(resolve, reject, ref);
        expect(reject).toHaveBeenCalledTimes(1);
        expect(reject).toHaveBeenCalledWith('err');
      });
      test('should always set default canceler', () => {
        const task = Task(({ ok }) => ok(undefined));
        const ref = Ref(() => {});

        task.taskRun(
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
          taskRun: expect.any(Function),
        });
        const ref = Ref(() => {});
        const resolve = jest.fn();
        const reject = jest.fn();
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await task.taskRun(resolve, reject, ref);
        expect(resolve).toHaveBeenCalledTimes(1);
        expect(resolve).toHaveBeenCalledWith('value');
      });
      test('should set default canceler if omitted', () => {
        const task = Task(async ({ ok }) => ok(undefined));
        const ref = Ref(() => {});

        task.taskRun(
          () => {},
          () => {},
          ref
        );
        expect(Ref.read(ref)).toBe(Task.defaultCanceler);
      });
      test('should set default canceler setCanceler(undefined)', () => {
        const canceler = () => {};
        const task = Task(async ({ ok, setCanceler }) => {
          setCanceler(canceler);
          setCanceler(undefined);

          return ok(undefined);
        });
        const ref = Ref(() => {});

        task.taskRun(
          () => {},
          () => {},
          ref
        );
        expect(Ref.read(ref)).toBe(Task.defaultCanceler);
      });

      test('should set canceler', () => {
        const canceler = () => {};
        const task = Task(async ({ ok, setCanceler }) => {
          setCanceler(canceler);

          return ok(undefined);
        });
        const ref = Ref(() => {});

        task.taskRun(
          () => {},
          () => {},
          ref
        );
        expect(Ref.read(ref)).toBe(canceler);
      });
    });
  });
  describe(Task.all, () => {
    test('should return empty array if empty', async () => {
      const allTask = Task.all([]);
      await ExpectTask.toResolve(allTask, []);
    });
    test('should reject first error', async () => {
      const allTask = Task.all([
        generateTask({ delayMs: 0, value: 'value1' }),
        generateTask({ delayMs: 0, error: 'error1' }),
        generateTask({ delayMs: 0, value: 'value2' }),
        generateTask({ delayMs: 0, error: 'error2' }),
      ]);
      await ExpectTask.toReject(allTask, 'error1');
    });

    test('should cancel other tasks', async () => {
      const taskCount = 4;
      const taskData = Array.from({ length: taskCount }).map((_, taskIndex) => {
        const canceler = jest.fn();
        return {
          task:
            taskIndex === 0
              ? generateTask({ delayMs: 0, error: `error${taskIndex}`, canceler })
              : generateTask({ delayMs: 100, value: `value${taskIndex}`, canceler }),
          canceler,
        };
      });
      const allTask = Task.all(taskData.map((_) => _.task));
      await ExpectTask.toReject(allTask, 'error0');

      taskData.forEach(({ canceler }, cancelerIndex) => {
        expect(canceler).toHaveBeenCalledTimes(cancelerIndex === 0 ? 0 : 1);
      });
    });
    test('should cancel every tasks when canceled', async () => {
      const taskCount = 4;
      const taskData = Array.from({ length: taskCount }).map((_, taskIndex) => {
        const canceler = jest.fn();
        return {
          task: generateTask({ value: `value${taskIndex}`, canceler, delayMs: 2 }),
          canceler,
        };
      });

      const allTask = Task.any(taskData.map((_) => _.task));
      const report = ExpectTask.run(allTask);
      report.cancelerRef.current();

      taskData.forEach(({ canceler }) => {
        expect(canceler).toHaveBeenCalledTimes(1);
      });
      await report.finished;
    });
    test('should resolve array of values', async () => {
      const allTask = Task.all([
        generateTask<'value1', 'error1'>({ delayMs: 0, value: 'value1' }),
        generateTask<'value2', 'error2'>({ delayMs: 0, value: 'value2' }),
        generateTask<'value3', 'error3'>({ delayMs: 0, value: 'value3' }),
      ]);
      assertType<typeof allTask, Task<['value1', 'value2', 'value3'], 'error1' | 'error2' | 'error3'>>(true);
      await ExpectTask.toResolve(allTask, ['value1', 'value2', 'value3']);
    });
    test('should handle iterable values', async () => {
      const taskArray = [
        generateTask({ delayMs: 0, value: 'value1' }),
        generateTask({ delayMs: 0, value: 'value2' }),
        generateTask({ delayMs: 0, value: 'value3' }),
      ];
      const allTask = Task.all({
        [Symbol.iterator]: () => taskArray[Symbol.iterator](),
      });
      await ExpectTask.toResolve(allTask, ['value1', 'value2', 'value3']);
    });
  });
  describe(Task.any, () => {
    test('should return empty array if empty', async () => {
      const allTask = Task.any([]);
      await ExpectTask.toReject(allTask, AggregateError({ errors: [] }));
    });
    test('should resolve first value', async () => {
      const anyTask = Task.any([
        generateTask({ delayMs: 0, value: 'value1' }),
        generateTask({ delayMs: 0, error: 'error1' }),
        generateTask({ delayMs: 0, value: 'value2' }),
        generateTask({ delayMs: 0, error: 'error2' }),
      ]);
      await ExpectTask.toResolve(anyTask, 'value1');
    });

    test('should cancel other tasks', async () => {
      const taskCount = 4;
      const taskData = Array.from({ length: taskCount }).map((_, taskIndex) => {
        const canceler = jest.fn();
        return {
          task:
            taskIndex === 0
              ? generateTask({ delayMs: 0, value: `value${taskIndex}`, canceler })
              : generateTask({ delayMs: 100, error: `error${taskIndex}`, canceler }),
          canceler,
        };
      });
      const anyTask = Task.any(taskData.map((_) => _.task));

      await ExpectTask.toResolve(anyTask, 'value0');

      taskData.forEach(({ canceler }, cancelerIndex) => {
        expect(canceler).toHaveBeenCalledTimes(cancelerIndex === 0 ? 0 : 1);
      });
    });
    test('should cancel every tasks when canceled', async () => {
      const taskCount = 4;
      const taskData = Array.from({ length: taskCount }).map((_, taskIndex) => {
        const canceler = jest.fn();
        return {
          task: generateTask({ delayMs: 2, value: `value${taskIndex}`, canceler }),
          canceler,
        };
      });

      const anyTask = Task.any(taskData.map((_) => _.task));
      const report = ExpectTask.run(anyTask);
      report.cancelerRef.current();

      taskData.forEach(({ canceler }) => {
        expect(canceler).toHaveBeenCalledTimes(1);
      });
      await report.finished;
    });
    test('should reject an aggregate of errors', async () => {
      const anyTask = Task.any([
        generateTask<'value1', 'error1'>({ delayMs: 0, error: 'error1' }),
        generateTask<'value2', 'error2'>({ delayMs: 0, error: 'error2' }),
        generateTask<'value3', 'error3'>({ delayMs: 0, error: 'error3' }),
      ]);
      assertType<typeof anyTask, Task<'value1' | 'value2' | 'value3', AggregateError<['error1', 'error2', 'error3']>>>(
        true
      );
      await ExpectTask.toReject(anyTask, AggregateError({ errors: ['error1', 'error2', 'error3'] }));
    });
    test('should handle iterable values', async () => {
      const taskArray = [
        generateTask({ delayMs: 1, value: 'value1' }),
        generateTask({ delayMs: 0, value: 'value2' }),
        generateTask({ delayMs: 1, value: 'value3' }),
      ];
      const anyTask = Task.any({
        [Symbol.iterator]: () => taskArray[Symbol.iterator](),
      });
      await ExpectTask.toResolve(anyTask, 'value2');
    });
  });
  describe(Task.allSettled, () => {
    test('should return empty array if empty', async () => {
      const allTask = Task.allSettled([]);
      await ExpectTask.toResolve(allTask, []);
    });
    test('should resolve array of results', async () => {
      const anyTask = Task.allSettled([
        generateTask({ delayMs: 0, value: 'value1' }),
        generateTask({ delayMs: 0, error: 'error1' }),
        generateTask({ delayMs: 0, value: 'value2' }),
        generateTask({ delayMs: 0, error: 'error2' }),
      ]);
      await ExpectTask.toResolve(anyTask, [
        Result.Ok('value1'),
        Result.Error('error1'),
        Result.Ok('value2'),
        Result.Error('error2'),
      ]);
    });
  });
  describe(Task.map, () => {
    test('should keep unchanged when failure', async () => {
      const task = generateTask<typeof anyObject, typeof anyError>({ error: anyError });
      const mapTask = Task.map(task, (_) => ({ ..._, bar: true }));

      await ExpectTask.toReject(mapTask, anyError);
    });
    test('should map value when success', async () => {
      const task = generateTask({ value: anyObject });
      const mapTask = Task.map(task, (_) => ({ ..._, bar: true }));
      await ExpectTask.toResolve(mapTask, {
        ...anyObject,
        bar: true,
      });
    });
    test('should map value when async success', async () => {
      const task = generateTask({ delayMs: 0, value: anyObject });
      const mapTask = Task.map(task, (_) => ({ ..._, bar: true }));

      await ExpectTask.toResolve(mapTask, {
        ...anyObject,
        bar: true,
      });
    });
    test('should forward canceler', async () => {
      const task = generateTask<typeof anyObject, typeof anyError>({ delayMs: 0, value: anyObject });
      const mapTask = Task.map(task, (_) => _);
      jest.spyOn(task, 'taskRun');
      const runReport = ExpectTask.run(mapTask);
      expect(task.taskRun).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), runReport.cancelerRef);
      await runReport.finished;
    });
  });

  describe(Task.mapError, () => {
    test('should keep unchanged when success', async () => {
      const task = generateTask<typeof anyObject, typeof anyError>({ value: anyObject });
      const mapTask = Task.mapError(task, (_) => ({ ..._, bar: true }));

      await ExpectTask.toResolve(mapTask, anyObject);
    });
    test('should map error when success', async () => {
      const task = generateTask<typeof anyObject, typeof anyError>({ error: anyError });
      const mapTask = Task.mapError(task, (_) => ({ ..._, bar: true }));

      await ExpectTask.toReject(mapTask, {
        ...anyError,
        bar: true,
      });
    });
    test('should map error when async failure', async () => {
      const task = generateTask({ delayMs: 0, error: anyError });
      const mapTask = Task.mapError(task, (_) => ({ ..._, bar: true }));

      await ExpectTask.toReject(mapTask, {
        ...anyError,
        bar: true,
      });
    });
    test('should forward canceler', async () => {
      const task = generateTask<typeof anyObject, typeof anyError>({ delayMs: 0, value: anyObject });
      const mapTask = Task.mapError(task, (_) => _);
      jest.spyOn(task, 'taskRun');
      const runReport = ExpectTask.run(mapTask);
      expect(task.taskRun).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), runReport.cancelerRef);
      await runReport.finished;
    });
  });

  describe(Task.andThen, () => {
    describe.each(allSyncCombination)('(%s, () => %s)', (before, after) => {
      const stringify = (num: number) =>
        generateTask<string, 'TestError'>({ delayMs: after === 'async' ? 0 : undefined, value: String(num) });

      test('should return unchanged result when failure', async () => {
        const task = generateTask<number, 'TestError'>({
          delayMs: before === 'async' ? 0 : undefined,
          error: 'TestError',
        });
        const thenTask = Task.andThen(task, stringify);

        await ExpectTask.toReject(thenTask, 'TestError');
      });
      test('should map value when success', async () => {
        const task = generateTask<number, 'TestError'>({ delayMs: before === 'async' ? 0 : undefined, value: 4 });
        const thenTask = Task.andThen(task, stringify);

        await ExpectTask.toResolve(thenTask, '4');
      });
    });

    test('should forward canceler', async () => {
      const task = generateTask<typeof anyObject, typeof anyError>({ delayMs: 0, value: anyObject });
      const afterTask = generateTask<typeof anyObject, typeof anyError>({ delayMs: 0, value: anyObject });
      const thenTask = Task.andThen(task, (_) => afterTask);
      jest.spyOn(task, 'taskRun');
      jest.spyOn(afterTask, 'taskRun');
      const runReport = ExpectTask.run(thenTask);
      await runReport.finished;
      expect(task.taskRun).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), runReport.cancelerRef);
      expect(afterTask.taskRun).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), runReport.cancelerRef);
    });
  });

  describe(Task.andRun, () => {
    describe.each(allSyncCombination)('(%s, () => %s)', (before, after) => {
      const task = generateTask({ delayMs: before === 'async' ? 0 : undefined, value: anyObject });
      const andTask = generateTask({ delayMs: after === 'async' ? 0 : undefined, value: anyOtherObject });

      test('should return a new task with same value', async () => {
        await ExpectTask.toResolve(
          Task.andRun(task, () => andTask),
          anyObject
        );
      });
      test('should call callback and run task', async () => {
        const taskCallbackRun = jest.fn(({ ok }) => ok(anyOtherObject));
        const taskCallback = Task(taskCallbackRun);
        await ExpectTask.run(Task.andRun(task, () => taskCallback)).finished;

        expect(taskCallbackRun).toHaveBeenCalled();
      });
      test('should call callback with task value', async () => {
        const callback = jest.fn(() => andTask);
        await ExpectTask.run(Task.andRun(task, callback)).finished;

        expect(callback).toHaveBeenCalledWith(anyObject);
      });
    });
  });

  describe(Task.orElse, () => {
    describe.each(allSyncCombination)('(%s, () => %s)', (before, after) => {
      const handleError = (message: string) =>
        generateTask<string, string>({ delayMs: after === 'async' ? 0 : undefined, value: `${message}_handled` });

      test('should return unchanged result when Result.Ok', async () => {
        const task = generateTask<string, 'TestError'>({
          delayMs: before === 'async' ? 0 : undefined,
          value: 'anyValue',
        });
        const taskElse = Task.orElse(task, handleError);
        await ExpectTask.toResolve(taskElse, 'anyValue');
      });
      test('should map value when Result.Ok', async () => {
        const task = generateTask<string, 'TestError'>({
          delayMs: before === 'async' ? 0 : undefined,
          error: 'TestError',
        });
        const taskElse = Task.orElse(task, handleError);
        await ExpectTask.toResolve(taskElse, 'TestError_handled');
      });
    });

    test('should forward canceler', async () => {
      const task = generateTask<typeof anyObject, typeof anyError>({ delayMs: 0, error: anyError });
      const afterTask = generateTask<typeof anyObject, typeof anyError>({ delayMs: 0, value: anyObject });
      const thenTask = Task.orElse(task, (_) => afterTask);
      jest.spyOn(task, 'taskRun');
      jest.spyOn(afterTask, 'taskRun');
      const runReport = ExpectTask.run(thenTask);
      await runReport.finished;

      expect(task.taskRun).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), runReport.cancelerRef);
      expect(afterTask.taskRun).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), runReport.cancelerRef);
    });
  });
});
