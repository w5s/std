import type { Option } from '@w5s/core';
import { defer } from '@w5s/async/dist/defer.js';
import { FiberId } from '../FiberId.js';
import type { SchedulerFiberState } from './SchedulerFiberState.js';
import type { FiberCallback } from '../FiberCallback.js';
import type { FiberResult } from '../FiberResult.js';
import {
  __cancelScheduled,
  __requestScheduled,
  type ScheduledRequestCallback,
  type ScheduledRequestId,
} from '../__requestScheduled.js';

export class Scheduler {
  #currentId = FiberId(1);
  #fiber: Map<FiberId, SchedulerFiberState> = new Map();
  #timerId: Option<ScheduledRequestId>;

  spawn(callback: FiberCallback): FiberResult<any> {
    const id = this.nextId();
    const deferred = defer();
    this.#fiber.set(id, {
      id,
      callback,
      running: false,
      generator: undefined,
      deferred,
    });
    return { id, promise: deferred.promise };
  }

  resume(id: FiberId): void {
    this.modifyState(id, (state) =>
      state.running
        ? state
        : {
            ...state,
            running: true,
          },
    );
  }

  suspend(id: FiberId): void {
    this.modifyState(id, (state) =>
      state.running
        ? {
            ...state,
            running: false,
          }
        : state,
    );
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
        this.onStateChange(fiberState, fiberStateNew);
        return true;
      }
    }
    return false;
  }

  protected onStateChange(previous: SchedulerFiberState, next: SchedulerFiberState): void {
    if (previous.running !== next.running) {
      this.scheduleNext();
    }
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
        this.#timerId = __requestScheduled(this.onCycle, 12);
      }
    } else if (this.#timerId !== undefined) {
      __cancelScheduled(this.#timerId);
    }
  }

  protected onCycle: ScheduledRequestCallback = (deadline) => {
    // Clear timer
    this.#timerId = undefined;

    for (const fiber of this.#fiber.values()) {
      if (deadline.timeRemaining() === 0) {
        break;
      }

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
