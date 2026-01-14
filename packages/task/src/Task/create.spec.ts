import { describe, it, expect, vi } from 'vitest';
import { Symbol } from '@w5s/core';
import { create } from './create.js';
import { ok } from './ok.js';
import { error } from './error.js';

vi.mock('./run.js', async () => ({
  run: vi.fn(),
}));

describe(create, () => {
  const anyCanceler = new AbortController().signal;
  const anyExecute = vi.fn();

  describe('sync', () => {
    it('should construct a success sync task', () => {
      const task = create(() => ok('foo'));
      const resolve = vi.fn();
      const reject = vi.fn();

      task[Symbol.run]({ resolve, reject, canceler: anyCanceler, execute: anyExecute });
      expect(resolve).toHaveBeenCalledTimes(1);
      expect(resolve).toHaveBeenCalledWith('foo');
    });
    it('should construct a void task', () => {
      const task = create(() => ok());
      const resolve = vi.fn();
      const reject = vi.fn();

      task[Symbol.run]({ resolve, reject, canceler: anyCanceler, execute: anyExecute });
      expect(resolve).toHaveBeenCalledTimes(1);
      expect(resolve).toHaveBeenCalledWith(undefined);
    });
    it('should construct a failure sync task', async () => {
      const task = create<never, 'err'>(() => error('err'));
      const resolve = vi.fn();
      const reject = vi.fn();

      task[Symbol.run]({ resolve, reject, canceler: anyCanceler, execute: anyExecute });
      expect(reject).toHaveBeenCalledTimes(1);
      expect(reject).toHaveBeenCalledWith('err');
    });
  });
  describe('async', () => {
    it('should construct an success async task', async () => {
      const task = create(async () => ok('value'));
      const resolve = vi.fn();
      const reject = vi.fn();

      await task[Symbol.run]({ resolve, reject, canceler: anyCanceler, execute: anyExecute });
      expect(resolve).toHaveBeenCalledTimes(1);
      expect(resolve).toHaveBeenCalledWith('value');
    });
    it('should construct a void task', async () => {
      const task = create(async () => ok());
      const resolve = vi.fn();
      const reject = vi.fn();

      await task[Symbol.run]({ resolve, reject, canceler: anyCanceler, execute: anyExecute });
      expect(resolve).toHaveBeenCalledTimes(1);
      expect(resolve).toHaveBeenCalledWith(undefined);
    });
  });
  it('should forward canceler', () => {
    const someCanceler = new AbortController().signal;
    let innerCanceler: AbortSignal | undefined;
    const task = create(async ({ canceler }) => {
      innerCanceler = canceler;
      return ok();
    });

    task[Symbol.run]({
      resolve: () => {},
      reject: () => {},
      canceler: someCanceler,
      execute: anyExecute,
    });
    expect(innerCanceler).toBe(someCanceler);
  });
});
