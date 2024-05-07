/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/await-thenable */
import { describe, it, expect, vi, type MockedFunction } from 'vitest';
import { AggregateError } from '@w5s/error';
import { assertType, taskStub } from './testing.js';
import { Ref } from './Ref.js';
import { Result } from './Result.js';
import { Task, type TaskLike, type TaskRunner } from './Task.js';
import { Option } from './Option.js';
import { resolve } from './Task/resolve.js';
import { all } from './Task/all.js';
import { allSettled } from './Task/allSettled.js';
import { andRun } from './Task/andRun.js';
import { andThen } from './Task/andThen.js';
import { any } from './Task/any.js';
import { create } from './Task/create.js';
import { hasInstance } from './Task/hasInstance.js';
import { map } from './Task/map.js';
import { mapError } from './Task/mapError.js';
import { orElse } from './Task/orElse.js';
import { reject } from './Task/reject.js';
import { tryCall } from './Task/tryCall.js';
import { unsafeRun } from './Task/unsafeRun.js';
import { unsafeRunOk } from './Task/unsafeRunOk.js';
import { from } from './Task/from.js';

const anyObject = Object.freeze({ foo: true });
const anyOtherObject = { bar: true };
const anyError = new Error('TestError');
const anyCancelerRef = Ref(() => {});
const anyRunner = <V, E>(_task: TaskLike<V, E>) => Result.Ok() as Result<any, any>;

namespace ExpectTask {
  export function run<Value, Error>(
    task: Task<Value, Error>
  ): {
    resolve: MockedFunction<(value: Value) => void>;
    reject: MockedFunction<(error: Error) => void>;
    initialCanceler: MockedFunction<() => void>;
    cancelerRef: Ref<MockedFunction<() => void>>;
    finished: Promise<void>;
    run: TaskRunner;
  } {
    const resolveTask = vi.fn((_value: Value): void => {});
    const rejectTask = vi.fn((_error: Error): void => {});
    const initialCanceler = vi.fn(() => {});
    const cancelerRef = Ref(initialCanceler);

    const run = vi.fn();
    return {
      resolve: resolveTask,
      reject: rejectTask,
      initialCanceler,
      cancelerRef,
      run,
      finished: new Promise((resolve, _reject) => {
        task.taskRun({
          resolve: (value) => {
            resolveTask(value);
            resolve();
          },
          reject: (value) => {
            rejectTask(value);
            resolve();
          },
          canceler: cancelerRef,
          run,
        });
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
  it('is an alias to functions', () => {
    expect(Task).toEqual({
      all,
      allSettled,
      andRun,
      andThen,
      any,
      create,
      from,
      hasInstance,
      map,
      mapError,
      orElse,
      reject,
      resolve,
      tryCall,
      unsafeRun,
      unsafeRunOk,
    });
  });

  const allSyncCombination = [
    ['sync', 'sync'],
    ['async', 'sync'],
    ['sync', 'async'],
    ['async', 'async'],
  ] as Array<['sync' | 'async', 'sync' | 'async']>;

  describe('.resolve', () => {
    it('should construct a sync task', async () => {
      const task = Task.resolve(anyObject);
      await ExpectTask.toResolve(task, anyObject);
    });
    it('should resolve void task', async () => {
      const task = Task.resolve();
      assertType<typeof task, Task<void, never>>(true);
      await ExpectTask.toResolve(task, undefined);
    });
  });
  describe('.reject', () => {
    it('should construct a sync task', async () => {
      const task = Task.reject(anyError);
      await ExpectTask.toReject(task, anyError);
    });
    it('should reject void task', async () => {
      const task = Task.reject();
      assertType<typeof task, Task<never, void>>(true);
      await ExpectTask.toReject(task, undefined);
    });
  });
  describe('.tryCall', () => {
    class TestError extends Error {
      override name = 'TestError';

      constructor(public innerError: unknown = undefined) {
        super('TestMessage');
      }
    }
    it('should resolve(block()) when nothing is thrown', async () => {
      const task = Task.tryCall(
        () => 'return_value',
        () => new TestError()
      );
      await ExpectTask.toResolve(task, 'return_value');
    });
    it('should reject(onError(error)) when error is thrown', async () => {
      const thrownError = new Error('custom');
      const onError = vi.fn((_error: unknown) => new TestError());
      const task = Task.tryCall(() => {
        throw thrownError;
      }, onError);
      await ExpectTask.toReject(task, new TestError());
      expect(onError).toHaveBeenCalledWith(thrownError);
    });
    it('should return Result.Ok(block()) when nothing is thrown (async handler)', async () => {
      const task = Task.tryCall(
        async () => 'return_value',
        async (innerError) => new TestError(innerError)
      );
      await ExpectTask.toResolve(task, 'return_value');
    });
    it('should return Result.Ok(block()) when nothing is thrown (sync handler)', async () => {
      const task = Task.tryCall(
        () => 'return_value',
        async (innerError) => new TestError(innerError)
      );
      await ExpectTask.toResolve(task, 'return_value');
    });
    it('should return Result.Error(onError(error)) when promise is rejected (async handler)', async () => {
      const thrownError = new Error('custom');
      const onError = vi.fn(async (innerError: unknown) => new TestError(innerError));
      const task = Task.tryCall(() => Promise.reject(thrownError), onError);

      await ExpectTask.toReject(task, new TestError(thrownError));
      expect(onError).toHaveBeenCalledWith(thrownError);
    });
    it('should return Result.Error(onError(error)) when promise is rejected (sync handler)', async () => {
      const thrownError = new Error('custom');
      const onError = vi.fn((innerError: unknown) => new TestError(innerError));
      const task = Task.tryCall(() => Promise.reject(thrownError), onError);
      await ExpectTask.toReject(task, new TestError(thrownError));
      expect(onError).toHaveBeenCalledWith(thrownError);
    });
  });
  describe('.hasInstance', () => {
    it('should return false for any object', () => {
      expect(Task.hasInstance(true)).toEqual(false);
      expect(Task.hasInstance(null)).toEqual(false);
      expect(Task.hasInstance(() => true)).toEqual(false);
    });
    it('should return true for Task object', () => {
      const unknownValue: unknown = Task.resolve(anyObject);

      expect(Task.hasInstance(unknownValue)).toEqual(true);
      if (Task.hasInstance(unknownValue)) {
        assertType<typeof unknownValue, TaskLike<unknown, unknown>>(true);
      }
    });
  });

  describe('create()', () => {
    it('should forward run', () => {
      const subtask = taskStub({ value: anyObject });
      const task = Task.create(({ run }) => run(subtask));
      const resolve = vi.fn();
      const reject = vi.fn();
      const run = vi.fn(anyRunner);
      task.taskRun({ resolve, reject, canceler: anyCancelerRef, run });
      expect(run).toHaveBeenCalledWith(subtask, anyCancelerRef);
    });
    describe('sync', () => {
      it('should construct a success sync task', () => {
        const task = Task.create(({ ok }) => ok('foo'));
        const resolve = vi.fn();
        const reject = vi.fn();

        task.taskRun({ resolve, reject, canceler: anyCancelerRef, run: anyRunner });
        expect(resolve).toHaveBeenCalledTimes(1);
        expect(resolve).toHaveBeenCalledWith('foo');
      });
      it('should construct a void task', () => {
        const task = Task.create(({ ok }) => ok());
        const resolve = vi.fn();
        const reject = vi.fn();

        task.taskRun({ resolve, reject, canceler: anyCancelerRef, run: anyRunner });
        expect(resolve).toHaveBeenCalledTimes(1);
        expect(resolve).toHaveBeenCalledWith(undefined);
      });
      it('should construct a failure sync task', async () => {
        const task = Task.create<never, 'err'>(({ error }) => error('err'));
        const resolve = vi.fn();
        const reject = vi.fn();

        task.taskRun({ resolve, reject, canceler: anyCancelerRef, run: anyRunner });
        expect(reject).toHaveBeenCalledTimes(1);
        expect(reject).toHaveBeenCalledWith('err');
      });
      it('should always set default canceler', () => {
        const task = Task.create(({ ok }) => ok(undefined));
        const ref = Ref(() => {});

        task.taskRun({
          resolve: () => {},
          reject: () => {},
          canceler: ref,
          run: anyRunner,
        });
        expect(Ref.read(ref)).toBe(Option.None);
      });
    });
    describe('async', () => {
      it('should construct an success async task', async () => {
        const task = Task.create(async ({ ok }) => ok('value'));
        const resolve = vi.fn();
        const reject = vi.fn();

        await task.taskRun({ resolve, reject, canceler: anyCancelerRef, run: anyRunner });
        expect(resolve).toHaveBeenCalledTimes(1);
        expect(resolve).toHaveBeenCalledWith('value');
      });
      it('should construct a void task', async () => {
        const task = Task.create(async ({ ok }) => ok());
        const resolve = vi.fn();
        const reject = vi.fn();

        await task.taskRun({ resolve, reject, canceler: anyCancelerRef, run: anyRunner });
        expect(resolve).toHaveBeenCalledTimes(1);
        expect(resolve).toHaveBeenCalledWith(undefined);
      });
      it('should set default canceler if omitted', () => {
        const task = Task.create(async ({ ok }) => ok(undefined));
        const ref = Ref(() => {});

        task.taskRun({
          resolve: () => {},
          reject: () => {},
          canceler: ref,
          run: anyRunner,
        });
        expect(Ref.read(ref)).toBe(Option.None);
      });
      it('should set forward canceler reference', () => {
        const cancelerFn = () => {};
        const task = Task.create(async ({ ok, canceler }) => {
          canceler.current = cancelerFn;
          canceler.current = undefined;

          return ok(Option.None);
        });
        const ref = Ref(() => {});

        task.taskRun({
          resolve: () => {},
          reject: () => {},
          canceler: ref,
          run: anyRunner,
        });
        expect(Ref.read(ref)).toBe(Option.None);
      });

      it('should set canceler', () => {
        const cancelerFn = () => {};
        const task = Task.create(async ({ ok, canceler }) => {
          canceler.current = cancelerFn;

          return ok();
        });
        const ref = Ref(() => {});

        task.taskRun({
          resolve: () => {},
          reject: () => {},
          canceler: ref,
          run: anyRunner,
        });
        expect(Ref.read(ref)).toBe(cancelerFn);
      });
    });
  });
  describe('.all', () => {
    it('should return empty array if empty', async () => {
      const allTask = Task.all([]);
      await ExpectTask.toResolve(allTask, []);
    });
    it('should reject first error', async () => {
      const allTask = Task.all([
        taskStub({ delayMs: 1, value: 'value1' }),
        taskStub({ delayMs: 1, error: 'error1' }),
        taskStub({ delayMs: 1, value: 'value2' }),
        taskStub({ delayMs: 1, error: 'error2' }),
      ]);
      await ExpectTask.toReject(allTask, 'error1');
    });

    it('should cancel other tasks', async () => {
      const taskCount = 4;
      const taskData = Array.from({ length: taskCount }).map((_, taskIndex) => {
        const canceler = vi.fn();
        return {
          task:
            taskIndex === 0
              ? taskStub({ delayMs: 1, error: `error${taskIndex}`, canceler })
              : taskStub({ delayMs: 100, value: `value${taskIndex}`, canceler }),
          canceler,
        };
      });
      const allTask = Task.all(taskData.map((_) => _.task));
      await ExpectTask.toReject(allTask, 'error0');

      taskData.forEach(({ canceler }, cancelerIndex) => {
        expect(canceler).toHaveBeenCalledTimes(cancelerIndex === 0 ? 0 : 1);
      });
    });
    it('should cancel every tasks when canceled', async () => {
      const taskCount = 4;
      const taskData = Array.from({ length: taskCount }).map((_, taskIndex) => {
        const canceler = vi.fn();
        return {
          task: taskStub({ value: `value${taskIndex}`, canceler, delayMs: 2 }),
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
    it('should resolve array of values', async () => {
      const allTask = Task.all([
        taskStub<'value1', 'error1'>({ delayMs: 1, value: 'value1' }),
        taskStub<'value2', 'error2'>({ delayMs: 1, value: 'value2' }),
        taskStub<'value3', 'error3'>({ delayMs: 1, value: 'value3' }),
      ]);
      assertType<typeof allTask, Task<['value1', 'value2', 'value3'], 'error1' | 'error2' | 'error3'>>(true);
      await ExpectTask.toResolve(allTask, ['value1', 'value2', 'value3']);
    });
    it('should handle iterable values', async () => {
      const taskArray = [
        taskStub({ delayMs: 1, value: 'value1' }),
        taskStub({ delayMs: 1, value: 'value2' }),
        taskStub({ delayMs: 1, value: 'value3' }),
      ];
      const allTask = Task.all({
        [Symbol.iterator]: () => taskArray[Symbol.iterator](),
      });
      await ExpectTask.toResolve(allTask, ['value1', 'value2', 'value3']);
    });
  });
  describe('.any', () => {
    it('should return empty array if empty', async () => {
      const allTask = Task.any([]);
      await ExpectTask.toReject(allTask, AggregateError([]));
    });
    it('should resolve first value', async () => {
      const anyTask = Task.any([
        taskStub({ delayMs: 1, value: 'value1' }),
        taskStub({ delayMs: 1, error: 'error1' }),
        taskStub({ delayMs: 1, value: 'value2' }),
        taskStub({ delayMs: 1, error: 'error2' }),
      ]);
      await ExpectTask.toResolve(anyTask, 'value1');
    });

    it('should cancel other tasks', async () => {
      const taskCount = 4;
      const taskData = Array.from({ length: taskCount }).map((_, taskIndex) => {
        const canceler = vi.fn();
        return {
          task:
            taskIndex === 0
              ? taskStub({ delayMs: 1, value: `value${taskIndex}`, canceler })
              : taskStub({ delayMs: 100, error: `error${taskIndex}`, canceler }),
          canceler,
        };
      });
      const anyTask = Task.any(taskData.map((_) => _.task));

      await ExpectTask.toResolve(anyTask, 'value0');

      taskData.forEach(({ canceler }, cancelerIndex) => {
        expect(canceler).toHaveBeenCalledTimes(cancelerIndex === 0 ? 0 : 1);
      });
    });
    it('should cancel every tasks when canceled', async () => {
      const taskCount = 4;
      const taskData = Array.from({ length: taskCount }).map((_, taskIndex) => {
        const canceler = vi.fn();
        return {
          task: taskStub({ delayMs: 2, value: `value${taskIndex}`, canceler }),
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
    it('should reject an aggregate of errors', async () => {
      const anyTask = Task.any([
        taskStub<'value1', 'error1'>({ delayMs: 1, error: 'error1' }),
        taskStub<'value2', 'error2'>({ delayMs: 1, error: 'error2' }),
        taskStub<'value3', 'error3'>({ delayMs: 1, error: 'error3' }),
      ]);
      assertType<typeof anyTask, Task<'value1' | 'value2' | 'value3', AggregateError<['error1', 'error2', 'error3']>>>(
        true
      );
      await ExpectTask.toReject(anyTask, AggregateError(['error1', 'error2', 'error3']));
    });
    it('should handle iterable values', async () => {
      const taskArray = [
        taskStub({ delayMs: 1, value: 'value1' }),
        taskStub({ delayMs: 0, value: 'value2' }),
        taskStub({ delayMs: 1, value: 'value3' }),
      ];
      const anyTask = Task.any({
        [Symbol.iterator]: () => taskArray[Symbol.iterator](),
      });
      await ExpectTask.toResolve(anyTask, 'value2');
    });
  });
  describe('.allSettled', () => {
    it('should return empty array if empty', async () => {
      const allTask = Task.allSettled([]);
      await ExpectTask.toResolve(allTask, []);
    });
    it('should resolve array of results', async () => {
      const anyTask = Task.allSettled([
        taskStub({ delayMs: 0, value: 'value1' }),
        taskStub({ delayMs: 0, error: 'error1' }),
        taskStub({ delayMs: 0, value: 'value2' }),
        taskStub({ delayMs: 0, error: 'error2' }),
      ]);
      await ExpectTask.toResolve(anyTask, [
        Result.Ok('value1'),
        Result.Error('error1'),
        Result.Ok('value2'),
        Result.Error('error2'),
      ]);
    });
  });
  describe('.map', () => {
    it('should keep unchanged when failure', async () => {
      const task = taskStub<typeof anyObject, typeof anyError>({ error: anyError });
      const mapTask = Task.map(task, (_) => ({ ..._, bar: true }));

      await ExpectTask.toReject(mapTask, anyError);
    });
    it('should map value when success', async () => {
      const task = taskStub({ value: anyObject });
      const mapTask = Task.map(task, (_) => ({ ..._, bar: true }));
      await ExpectTask.toResolve(mapTask, {
        ...anyObject,
        bar: true,
      });
    });
    it('should map value when async success', async () => {
      const task = taskStub({ delayMs: 0, value: anyObject });
      const mapTask = Task.map(task, (_) => ({ ..._, bar: true }));

      await ExpectTask.toResolve(mapTask, {
        ...anyObject,
        bar: true,
      });
    });
    it('should forward canceler', async () => {
      const task = taskStub<typeof anyObject, typeof anyError>({ delayMs: 0, value: anyObject });
      const mapTask = Task.map(task, (_) => _);
      vi.spyOn(task, 'taskRun');
      const runReport = ExpectTask.run(mapTask);
      expect(task.taskRun).toHaveBeenCalledWith({
        resolve: expect.any(Function),
        reject: expect.any(Function),
        canceler: runReport.cancelerRef,
        run: runReport.run,
      });
      await runReport.finished;
    });
  });

  describe('.mapError', () => {
    it('should keep unchanged when success', async () => {
      const task = taskStub<typeof anyObject, typeof anyError>({ value: anyObject });
      const mapTask = Task.mapError(task, (_) => ({ ..._, bar: true }));

      await ExpectTask.toResolve(mapTask, anyObject);
    });
    it('should map error when success', async () => {
      const task = taskStub<typeof anyObject, typeof anyError>({ error: anyError });
      const mapTask = Task.mapError(task, (_) => ({ ..._, bar: true }));

      await ExpectTask.toReject(mapTask, {
        ...anyError,
        bar: true,
      });
    });
    it('should map error when async failure', async () => {
      const task = taskStub({ delayMs: 0, error: anyError });
      const mapTask = Task.mapError(task, (_) => ({ ..._, bar: true }));

      await ExpectTask.toReject(mapTask, {
        ...anyError,
        bar: true,
      });
    });
    it('should forward canceler', async () => {
      const task = taskStub<typeof anyObject, typeof anyError>({ delayMs: 0, value: anyObject });
      const mapTask = Task.mapError(task, (_) => _);
      vi.spyOn(task, 'taskRun');
      const runReport = ExpectTask.run(mapTask);
      expect(task.taskRun).toHaveBeenCalledWith({
        resolve: expect.any(Function),
        reject: expect.any(Function),
        canceler: runReport.cancelerRef,
        run: runReport.run,
      });
      await runReport.finished;
    });
  });

  describe('.andThen', () => {
    describe.each(allSyncCombination)('(%s, () => %s)', (before, after) => {
      const stringify = (num: number) =>
        taskStub<string, 'TestError'>({ delayMs: after === 'async' ? 0 : undefined, value: String(num) });

      it('should return unchanged result when failure', async () => {
        const task = taskStub<number, 'TestError'>({
          delayMs: before === 'async' ? 0 : undefined,
          error: 'TestError',
        });
        const thenTask = Task.andThen(task, stringify);

        await ExpectTask.toReject(thenTask, 'TestError');
      });
      it('should map value when success', async () => {
        const task = taskStub<number, 'TestError'>({ delayMs: before === 'async' ? 0 : undefined, value: 4 });
        const thenTask = Task.andThen(task, stringify);

        await ExpectTask.toResolve(thenTask, '4');
      });
    });

    it('should forward canceler', async () => {
      const task = taskStub<typeof anyObject, typeof anyError>({ delayMs: 0, value: anyObject });
      const afterTask = taskStub<typeof anyObject, typeof anyError>({ delayMs: 0, value: anyObject });
      const thenTask = Task.andThen(task, (_) => afterTask);
      vi.spyOn(task, 'taskRun');
      vi.spyOn(afterTask, 'taskRun');
      const runReport = ExpectTask.run(thenTask);
      await runReport.finished;
      expect(task.taskRun).toHaveBeenCalledWith({
        resolve: expect.any(Function),
        reject: expect.any(Function),
        canceler: runReport.cancelerRef,
        run: runReport.run,
      });
      expect(afterTask.taskRun).toHaveBeenCalledWith({
        resolve: expect.any(Function),
        reject: expect.any(Function),
        canceler: runReport.cancelerRef,
        run: runReport.run,
      });
    });
  });

  describe('.andRun', () => {
    describe.each(allSyncCombination)('(%s, () => %s)', (before, after) => {
      const task = taskStub({ delayMs: before === 'async' ? 0 : undefined, value: anyObject });
      const andTask = taskStub({ delayMs: after === 'async' ? 0 : undefined, value: anyOtherObject });

      it('should return a new task with same value', async () => {
        await ExpectTask.toResolve(
          Task.andRun(task, () => andTask),
          anyObject
        );
      });
      it('should call callback and run task', async () => {
        const taskCallback = Task.create(({ ok }) => ok(anyOtherObject));
        const taskCallbackSpy = vi.spyOn(taskCallback, 'taskRun');
        await ExpectTask.run(Task.andRun(task, () => taskCallback)).finished;

        expect(taskCallbackSpy).toHaveBeenCalled();
      });
      it('should call callback with task value', async () => {
        const callback = vi.fn(() => andTask);
        await ExpectTask.run(Task.andRun(task, callback)).finished;

        expect(callback).toHaveBeenCalledWith(anyObject);
      });
    });
  });

  describe('.orElse', () => {
    describe.each(allSyncCombination)('(%s, () => %s)', (before, after) => {
      const handleError = (message: string) =>
        taskStub<string, string>({ delayMs: after === 'async' ? 0 : undefined, value: `${message}_handled` });

      it('should return unchanged result when Result.Ok', async () => {
        const task = taskStub<string, 'TestError'>({
          delayMs: before === 'async' ? 0 : undefined,
          value: 'anyValue',
        });
        const taskElse = Task.orElse(task, handleError);
        await ExpectTask.toResolve(taskElse, 'anyValue');
      });
      it('should map value when Result.Ok', async () => {
        const task = taskStub<string, 'TestError'>({
          delayMs: before === 'async' ? 0 : undefined,
          error: 'TestError',
        });
        const taskElse = Task.orElse(task, handleError);
        await ExpectTask.toResolve(taskElse, 'TestError_handled');
      });
    });

    it('should forward canceler', async () => {
      const task = taskStub<typeof anyObject, typeof anyError>({ delayMs: 0, error: anyError });
      const afterTask = taskStub<typeof anyObject, typeof anyError>({ delayMs: 0, value: anyObject });
      const thenTask = Task.orElse(task, (_) => afterTask);
      vi.spyOn(task, 'taskRun');
      vi.spyOn(afterTask, 'taskRun');
      const runReport = ExpectTask.run(thenTask);
      await runReport.finished;

      expect(task.taskRun).toHaveBeenCalledWith({
        resolve: expect.any(Function),
        reject: expect.any(Function),
        canceler: runReport.cancelerRef,
        run: runReport.run,
      });
      expect(afterTask.taskRun).toHaveBeenCalledWith({
        resolve: expect.any(Function),
        reject: expect.any(Function),
        canceler: runReport.cancelerRef,
        run: runReport.run,
      });
    });
  });
});
