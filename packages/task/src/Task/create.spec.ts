import { describe, it, expect, vi } from 'vitest';
import { Option, Ref, Symbol } from '@w5s/core';
import { create } from './create.js';
import { ok } from './ok.js';
import { error } from './error.js';

vi.mock('./run.js', async () => ({
  run: vi.fn(),
}));

describe(create, () => {
  const anyCancelerRef = Ref(() => {});
  const anyExecute = vi.fn();

  describe('sync', () => {
    it('should construct a success sync task', () => {
      const task = create(() => ok('foo'));
      const resolve = vi.fn();
      const reject = vi.fn();

      task[Symbol.run]({ resolve, reject, canceler: anyCancelerRef, execute: anyExecute });
      expect(resolve).toHaveBeenCalledTimes(1);
      expect(resolve).toHaveBeenCalledWith('foo');
    });
    it('should construct a void task', () => {
      const task = create(() => ok());
      const resolve = vi.fn();
      const reject = vi.fn();

      task[Symbol.run]({ resolve, reject, canceler: anyCancelerRef, execute: anyExecute });
      expect(resolve).toHaveBeenCalledTimes(1);
      expect(resolve).toHaveBeenCalledWith(undefined);
    });
    it('should construct a failure sync task', async () => {
      const task = create<never, 'err'>(() => error('err'));
      const resolve = vi.fn();
      const reject = vi.fn();

      task[Symbol.run]({ resolve, reject, canceler: anyCancelerRef, execute: anyExecute });
      expect(reject).toHaveBeenCalledTimes(1);
      expect(reject).toHaveBeenCalledWith('err');
    });
    it('should always set default canceler', () => {
      const task = create(() => ok(undefined));
      const ref = Ref(() => {});

      task[Symbol.run]({
        resolve: () => {},
        reject: () => {},
        canceler: ref,
        execute: anyExecute,
      });
      expect(Ref.read(ref)).toBe(Option.None);
    });
  });
  describe('async', () => {
    it('should construct an success async task', async () => {
      const task = create(async () => ok('value'));
      const resolve = vi.fn();
      const reject = vi.fn();

      await task[Symbol.run]({ resolve, reject, canceler: anyCancelerRef, execute: anyExecute });
      expect(resolve).toHaveBeenCalledTimes(1);
      expect(resolve).toHaveBeenCalledWith('value');
    });
    it('should construct a void task', async () => {
      const task = create(async () => ok());
      const resolve = vi.fn();
      const reject = vi.fn();

      await task[Symbol.run]({ resolve, reject, canceler: anyCancelerRef, execute: anyExecute });
      expect(resolve).toHaveBeenCalledTimes(1);
      expect(resolve).toHaveBeenCalledWith(undefined);
    });
    it('should set default canceler if omitted', () => {
      const task = create(async () => ok(undefined));
      const ref = Ref(() => {});

      task[Symbol.run]({
        resolve: () => {},
        reject: () => {},
        canceler: ref,
        execute: anyExecute,
      });
      expect(Ref.read(ref)).toBe(Option.None);
    });
    it('should set forward canceler reference', () => {
      const cancelerFn = () => {};
      const task = create(async ({ canceler }) => {
        canceler.current = cancelerFn;
        canceler.current = undefined;

        return ok(Option.None);
      });
      const ref = Ref(() => {});

      task[Symbol.run]({
        resolve: () => {},
        reject: () => {},
        canceler: ref,
        execute: anyExecute,
      });
      expect(Ref.read(ref)).toBe(Option.None);
    });

    it('should set canceler', () => {
      const cancelerFn = () => {};
      const task = create(async ({ canceler }) => {
        canceler.current = cancelerFn;

        return ok();
      });
      const ref = Ref(() => {});

      task[Symbol.run]({
        resolve: () => {},
        reject: () => {},
        canceler: ref,
        execute: anyExecute,
      });
      expect(Ref.read(ref)).toBe(cancelerFn);
    });
  });
});
