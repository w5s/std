import { describe, it, expect, vi } from 'vitest';
import { Option, Result, Ref } from '@w5s/core';
import { create } from './create.js';
import { taskStub } from '../Testing.js';
import type { TaskLike } from '../Task.js';

describe(create, () => {
  const anyValue = Object.freeze({ foo: true });
  const anyCancelerRef = Ref(() => {});
  const anyRunner = <V, E>(_task: TaskLike<V, E>) => Result.Ok() as Result<any, any>;

  it('should forward run', () => {
    const subtask = taskStub({ value: anyValue });
    const task = create(({ run }) => run(subtask));
    const resolve = vi.fn();
    const reject = vi.fn();
    const run = vi.fn(anyRunner);
    task.taskRun({ resolve, reject, canceler: anyCancelerRef, run });
    expect(run).toHaveBeenCalledWith(subtask, anyCancelerRef);
  });
  describe('sync', () => {
    it('should construct a success sync task', () => {
      const task = create(({ ok }) => ok('foo'));
      const resolve = vi.fn();
      const reject = vi.fn();

      task.taskRun({ resolve, reject, canceler: anyCancelerRef, run: anyRunner });
      expect(resolve).toHaveBeenCalledTimes(1);
      expect(resolve).toHaveBeenCalledWith('foo');
    });
    it('should construct a void task', () => {
      const task = create(({ ok }) => ok());
      const resolve = vi.fn();
      const reject = vi.fn();

      task.taskRun({ resolve, reject, canceler: anyCancelerRef, run: anyRunner });
      expect(resolve).toHaveBeenCalledTimes(1);
      expect(resolve).toHaveBeenCalledWith(undefined);
    });
    it('should construct a failure sync task', async () => {
      const task = create<never, 'err'>(({ error }) => error('err'));
      const resolve = vi.fn();
      const reject = vi.fn();

      task.taskRun({ resolve, reject, canceler: anyCancelerRef, run: anyRunner });
      expect(reject).toHaveBeenCalledTimes(1);
      expect(reject).toHaveBeenCalledWith('err');
    });
    it('should always set default canceler', () => {
      const task = create(({ ok }) => ok(undefined));
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
      const task = create(async ({ ok }) => ok('value'));
      const resolve = vi.fn();
      const reject = vi.fn();

      // eslint-disable-next-line @typescript-eslint/await-thenable
      await task.taskRun({ resolve, reject, canceler: anyCancelerRef, run: anyRunner });
      expect(resolve).toHaveBeenCalledTimes(1);
      expect(resolve).toHaveBeenCalledWith('value');
    });
    it('should construct a void task', async () => {
      const task = create(async ({ ok }) => ok());
      const resolve = vi.fn();
      const reject = vi.fn();

      // eslint-disable-next-line @typescript-eslint/await-thenable
      await task.taskRun({ resolve, reject, canceler: anyCancelerRef, run: anyRunner });
      expect(resolve).toHaveBeenCalledTimes(1);
      expect(resolve).toHaveBeenCalledWith(undefined);
    });
    it('should set default canceler if omitted', () => {
      const task = create(async ({ ok }) => ok(undefined));
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
      const task = create(async ({ ok, canceler }) => {
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
      const task = create(async ({ ok, canceler }) => {
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
