import type { Time } from '@w5s/time';
import type { Option } from '@w5s/core';
import { FiberId } from '../FiberId.js';
import type { SchedulerFiberState } from './SchedulerFiberState.js';
import type { FiberCallback } from '../FiberCallback.js';
import type { FiberResult } from '../FiberResult.js';

export class Scheduler {
  #currentId = FiberId(1);
  #fiber: Map<FiberId, SchedulerFiberState> = new Map();
  #timerId: Option<number>;

  spawn(callback: FiberCallback): FiberResult<any> {
    const id = this.nextId();
    const deferred = Promise.withResolvers();
    this.#fiber.set(id, {
      id,
      callback,
      running: false,
      generator: undefined,
      startTime: undefined,
      deferred,
    });
    return { id, promise: deferred.promise };
  }

  resume(id: FiberId): void {
    if (
      this.modifyState(id, (state) =>
        state.running
          ? state
          : {
              ...state,
              startTime: state.startTime ?? this.now(),
              running: true,
            },
      )
    ) {
      this.scheduleNext();
    }
  }

  suspend(id: FiberId): void {
    if (
      this.modifyState(id, (state) =>
        state.running
          ? {
              ...state,
              running: false,
            }
          : state,
      )
    ) {
      this.scheduleNext();
    }
  }

  terminate(id: FiberId): boolean {
    if (this.#fiber.delete(id)) {
      this.scheduleNext();
      return true;
    }
    return false;
  }

  protected getState(id: FiberId): Option<SchedulerFiberState> {
    return this.#fiber.get(id);
  }

  protected modifyState(id: FiberId, mapFn: (state: SchedulerFiberState) => SchedulerFiberState): boolean {
    const fiberState = this.#fiber.get(id);
    if (fiberState != null) {
      const fiberStateNew = mapFn(fiberState);
      if (fiberStateNew !== fiberState) {
        this.#fiber.set(id, fiberStateNew);
        return true;
      }
    }
    return false;
  }

  protected now() {
    return Date.now() as Time;
  }

  protected nextId(): FiberId {
    const currentId = this.#currentId;
    // @ts-ignore we know what we are doing
    this.#currentId += 1;
    return currentId;
  }

  protected scheduleNext() {
    const countActive = this.#fiber.size;
    if (countActive > 0) {
      if (this.#timerId === undefined) {
        this.#timerId = setTimeout(this.onCycle);
      }
    } else if (this.#timerId !== undefined) {
      clearTimeout(this.#timerId);
    }
  }

  protected onCycle: IdleRequestCallback = (_deadline) => {
    // Clear timer
    this.#timerId = undefined;

    for (const fiber of this.#fiber.values()) {
      if (fiber.running) {
        const generator = this.generator(fiber);
        try {
          const result = generator.next();
          if (result.done === true) {
            this.resolve(fiber, result.value);
          }
        } catch (error) {
          this.reject(fiber, error);
        }
      }
    }
    this.scheduleNext();
  };

  protected generator(fiber: SchedulerFiberState) {
    const { callback } = fiber;
    let { generator } = fiber;
    if (generator === undefined) {
      generator = callback();
      this.modifyState(fiber.id, (state) => ({ ...state, generator }));
    }
    return generator;
  }

  protected resolve(fiber: SchedulerFiberState, value: any): void {
    this.#fiber.delete(fiber.id);
    fiber.deferred.resolve(value);
  }

  protected reject(fiber: SchedulerFiberState, error: any): void {
    this.#fiber.delete(fiber.id);
    fiber.deferred.reject(error);
  }
}
