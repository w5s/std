import type { Option } from '@w5s/core';

import { defer } from '@w5s/async/dist/defer.js';

import type { FiberCallback } from '../FiberCallback.js';
import type { FiberResult } from '../FiberResult.js';
import type { SchedulerFiberState } from './SchedulerFiberState.js';

import { FiberId } from '../FiberId.js';
import {
  cancelScheduledCallback,
  requestScheduledCallback,
  type ScheduledRequestCallback,
  type ScheduledRequestId,
} from '../internal/requestScheduledCallback.js';

export class Scheduler {
  #currentId = FiberId(1);
  #fiber = new Map<FiberId, SchedulerFiberState>();
  #timerId: Option<ScheduledRequestId>;

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

  spawn<T>(callback: FiberCallback<T>): FiberResult<T> {
    const id = this.nextId();
    const deferred = defer<T>();
    this.#fiber.set(id, {
      callback,
      deferred,
      generator: undefined,
      id,
      running: false,
    });
    return { id, promise: deferred.promise };
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

  protected generator(fiber: SchedulerFiberState) {
    const { callback } = fiber;
    let { generator } = fiber;
    if (generator === undefined) {
      generator = callback();
      this.modifyState(fiber.id, (state) => ({ ...state, generator }));
    }
    return generator;
  }

  protected getCycleDeadline() {
    return 12;
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

  protected nextId(): FiberId {
    const currentId = this.#currentId;
    // @ts-ignore we know what we are doing
    this.#currentId += 1;
    return currentId;
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

  protected onStateChange(previous: SchedulerFiberState, next: SchedulerFiberState): void {
    if (previous.running !== next.running) {
      this.scheduleNext();
    }
  }

  protected reject(fiber: SchedulerFiberState, error: any): void {
    this.#fiber.delete(fiber.id);
    fiber.deferred.reject(error);
  }

  protected resolve(fiber: SchedulerFiberState, value: any): void {
    this.#fiber.delete(fiber.id);
    fiber.deferred.resolve(value);
  }

  protected scheduleNext() {
    const countActive = this.#fiber.size;
    if (countActive > 0) {
      if (this.#timerId === undefined) {
        this.#timerId = requestScheduledCallback(this.onCycle, this.getCycleDeadline());
      }
    } else if (this.#timerId !== undefined) {
      cancelScheduledCallback(this.#timerId);
    }
  }
}
