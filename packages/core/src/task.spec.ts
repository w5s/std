/* eslint-disable jest/no-export */
/* eslint-disable max-classes-per-file */
import { assertType } from './assert.js';
import { AggregateError } from './error.js';
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

const generateTask = <V = never, E = never>(
  options: {
    async?: boolean | undefined;
    canceler?: () => void;
    delay?: number;
  } & ({ value: V } | { error: E })
) => {
  const { canceler = () => {}, async } = options;

  return async !== true
    ? Task<V, E>(({ ok: resultOk, error: resultError }) =>
        'value' in options ? resultOk(options.value) : resultError(options.error)
      )
    : Task<V, E>(async ({ ok: resultOk, error: resultError, setCanceler }) => {
        setCanceler(canceler);
        await waitMs(options.delay ?? 0);
        return 'value' in options ? resultOk(options.value) : resultError(options.error);
      });
};

namespace ExpectTask {
  export function run<Value, Error>(
    task: Task<Value, Error>
  ): {
    resolve: jest.Mocked<(value: Value) => void>;
    reject: jest.Mocked<(error: Error) => void>;
    initialCanceler: jest.Mocked<() => void>;
    cancelerRef: Ref<jest.Mocked<() => void>>;
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
        task[Task.run](
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
      test('should set default canceler setCanceler(undefined)', () => {
        const canceler = () => {};
        const task = Task(async ({ ok, setCanceler }) => {
          setCanceler(canceler);
          setCanceler(undefined);

          return ok(undefined);
        });
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
        const task = Task(async ({ ok, setCanceler }) => {
          setCanceler(canceler);

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
  describe(Task.all, () => {
    test('should return empty array if empty', async () => {
      const allTask = Task.all([]);
      await ExpectTask.toResolve(allTask, []);
    });
    test('should reject first error', async () => {
      const allTask = Task.all([
        generateTask({ async: true, value: 'value1' }),
        generateTask({ async: true, error: 'error1' }),
        generateTask({ async: true, value: 'value2' }),
        generateTask({ async: true, error: 'error2' }),
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
              ? generateTask({ async: true, error: `error${taskIndex}`, canceler })
              : generateTask({ async: true, value: `value${taskIndex}`, canceler, delay: 100 }),
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
          task: generateTask({ async: true, value: `value${taskIndex}`, canceler, delay: 2 }),
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
        generateTask<'value1', 'error1'>({ async: true, value: 'value1' }),
        generateTask<'value2', 'error2'>({ async: true, value: 'value2' }),
        generateTask<'value3', 'error3'>({ async: true, value: 'value3' }),
      ]);
      assertType<typeof allTask, Task<['value1', 'value2', 'value3'], 'error1' | 'error2' | 'error3'>>(true);
      await ExpectTask.toResolve(allTask, ['value1', 'value2', 'value3']);
    });
    test('should handle iterable values', async () => {
      const taskArray = [
        generateTask({ async: true, value: 'value1' }),
        generateTask({ async: true, value: 'value2' }),
        generateTask({ async: true, value: 'value3' }),
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
        generateTask({ async: true, value: 'value1' }),
        generateTask({ async: true, error: 'error1' }),
        generateTask({ async: true, value: 'value2' }),
        generateTask({ async: true, error: 'error2' }),
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
              ? generateTask({ async: true, value: `value${taskIndex}`, canceler })
              : generateTask({ async: true, error: `error${taskIndex}`, canceler, delay: 100 }),
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
          task: generateTask({ async: true, value: `value${taskIndex}`, canceler, delay: 2 }),
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
        generateTask<'value1', 'error1'>({ async: true, error: 'error1' }),
        generateTask<'value2', 'error2'>({ async: true, error: 'error2' }),
        generateTask<'value3', 'error3'>({ async: true, error: 'error3' }),
      ]);
      assertType<typeof anyTask, Task<'value1' | 'value2' | 'value3', AggregateError<['error1', 'error2', 'error3']>>>(
        true
      );
      await ExpectTask.toReject(anyTask, AggregateError({ errors: ['error1', 'error2', 'error3'] }));
    });
    test('should handle iterable values', async () => {
      const taskArray = [
        generateTask({ async: true, value: 'value1', delay: 1 }),
        generateTask({ async: true, value: 'value2' }),
        generateTask({ async: true, value: 'value3', delay: 1 }),
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
        generateTask({ async: true, value: 'value1' }),
        generateTask({ async: true, error: 'error1' }),
        generateTask({ async: true, value: 'value2' }),
        generateTask({ async: true, error: 'error2' }),
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
      const task = generateTask<typeof anyObject, typeof anyError>({ async: false, error: anyError });
      const mapTask = Task.map(task, (_) => ({ ..._, bar: true }));

      await ExpectTask.toReject(mapTask, anyError);
    });
    test('should map value when success', async () => {
      const task = generateTask({ async: false, value: anyObject });
      const mapTask = Task.map(task, (_) => ({ ..._, bar: true }));
      await ExpectTask.toResolve(mapTask, {
        ...anyObject,
        bar: true,
      });
    });
    test('should map value when async success', async () => {
      const task = generateTask({ async: true, value: anyObject });
      const mapTask = Task.map(task, (_) => ({ ..._, bar: true }));

      await ExpectTask.toResolve(mapTask, {
        ...anyObject,
        bar: true,
      });
    });
    test('should forward canceler', async () => {
      const task = generateTask<typeof anyObject, typeof anyError>({ async: true, value: anyObject });
      const mapTask = Task.map(task, (_) => _);
      jest.spyOn(task, Task.run);
      const runReport = ExpectTask.run(mapTask);
      expect(task[Task.run]).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), runReport.cancelerRef);
      await runReport.finished;
    });
  });

  describe(Task.mapError, () => {
    test('should keep unchanged when success', async () => {
      const task = generateTask<typeof anyObject, typeof anyError>({ async: false, value: anyObject });
      const mapTask = Task.mapError(task, (_) => ({ ..._, bar: true }));

      await ExpectTask.toResolve(mapTask, anyObject);
    });
    test('should map error when success', async () => {
      const task = generateTask<typeof anyObject, typeof anyError>({ async: false, error: anyError });
      const mapTask = Task.mapError(task, (_) => ({ ..._, bar: true }));

      await ExpectTask.toReject(mapTask, {
        ...anyError,
        bar: true,
      });
    });
    test('should map error when async failure', async () => {
      const task = generateTask({ async: true, error: anyError });
      const mapTask = Task.mapError(task, (_) => ({ ..._, bar: true }));

      await ExpectTask.toReject(mapTask, {
        ...anyError,
        bar: true,
      });
    });
    test('should forward canceler', async () => {
      const task = generateTask<typeof anyObject, typeof anyError>({ async: true, value: anyObject });
      const mapTask = Task.mapError(task, (_) => _);
      jest.spyOn(task, Task.run);
      const runReport = ExpectTask.run(mapTask);
      expect(task[Task.run]).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), runReport.cancelerRef);
      await runReport.finished;
    });
  });

  describe(Task.andThen, () => {
    describe.each(allSyncCombination)('(%s, () => %s)', (before, after) => {
      const stringify = (num: number) =>
        generateTask<string, 'TestError'>({ async: after === 'async', value: String(num) });

      test('should return unchanged result when failure', async () => {
        const task = generateTask<number, 'TestError'>({ async: before === 'async', error: 'TestError' });
        const thenTask = Task.andThen(task, stringify);

        await ExpectTask.toReject(thenTask, 'TestError');
      });
      test('should map value when success', async () => {
        const task = generateTask<number, 'TestError'>({ async: before === 'async', value: 4 });
        const thenTask = Task.andThen(task, stringify);

        await ExpectTask.toResolve(thenTask, '4');
      });
    });

    test('should forward canceler', async () => {
      const task = generateTask<typeof anyObject, typeof anyError>({ async: true, value: anyObject });
      const afterTask = generateTask<typeof anyObject, typeof anyError>({ async: true, value: anyObject });
      const thenTask = Task.andThen(task, (_) => afterTask);
      jest.spyOn(task, Task.run);
      jest.spyOn(afterTask, Task.run);
      const runReport = ExpectTask.run(thenTask);
      await runReport.finished;
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
      const task = generateTask({ async: before === 'async', value: anyObject });
      const andTask = generateTask({ async: after === 'async', value: anyOtherObject });

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
        generateTask<string, string>({ async: after === 'async', value: `${message}_handled` });

      test('should return unchanged result when Result.Ok', async () => {
        const task = generateTask<string, 'TestError'>({ async: before === 'async', value: 'anyValue' });
        const taskElse = Task.orElse(task, handleError);
        await ExpectTask.toResolve(taskElse, 'anyValue');
      });
      test('should map value when Result.Ok', async () => {
        const task = generateTask<string, 'TestError'>({ async: before === 'async', error: 'TestError' });
        const taskElse = Task.orElse(task, handleError);
        await ExpectTask.toResolve(taskElse, 'TestError_handled');
      });
    });

    test('should forward canceler', async () => {
      const task = generateTask<typeof anyObject, typeof anyError>({ async: true, error: anyError });
      const afterTask = generateTask<typeof anyObject, typeof anyError>({ async: true, value: anyObject });
      const thenTask = Task.orElse(task, (_) => afterTask);
      jest.spyOn(task, Task.run);
      jest.spyOn(afterTask, Task.run);
      const runReport = ExpectTask.run(thenTask);
      await runReport.finished;

      expect(task[Task.run]).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), runReport.cancelerRef);
      expect(afterTask[Task.run]).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
        runReport.cancelerRef
      );
    });
  });
});
