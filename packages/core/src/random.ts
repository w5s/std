import { invariant } from './invariant.js';
import type { Int } from './integer.js';
import type { Task } from './task.js';
import type { Tag } from './type.js';

export namespace Random {
  const floor = Math.floor as (value: number) => Int;

  export type Value = Tag<number, { min: 0; max: 1 }>;

  /**
   * Return a new random value from number 0<= N <=1.
   * An invariant error is thrown when invalid number is given
   *
   * @example
   * ```typescript
   * const random = Random.Value(0);
   * ```
   * @category Constructor
   * @param numeric - numeric value >=0 and <=1
   */
  export function Value(numeric: number): Value {
    invariant(Value.hasInstance(numeric), `Random value should be between 0 and 1. Got ${numeric}`);

    return numeric;
  }
  export namespace Value {
    /**
     * Return `true` if `anyValue` is a valid `Random.Value`
     *
     * @example
     * ```typescript
     * Random.Value.hasInstance(null); // === false
     * Random.Value.hasInstance(Random.Value(0)); // === true
     * ```
     * @param anyValue - an unknown value to be refined
     */
    export function hasInstance(anyValue: unknown): anyValue is Value {
      return typeof anyValue === 'number' && !Number.isNaN(anyValue) && anyValue >= 0 && anyValue <= 1;
    }
  }

  export interface Generator extends Task<Random.Value, never> {}

  /**
   * Return a new generator from a callback
   *
   * @example
   * ```typescript
   * const dummyGenerator = Random.Generator(() => Random.Value(1));
   * Task.unsafeRun(dummyGenerator); // 1
   * ```
   * @category Constructor
   * @param getNextValue - an impure function that returns a new value
   */
  export function Generator(getNextValue: () => Random.Value): Generator {
    return { taskRun: (resolve) => resolve(getNextValue()) };
  }

  /**
   * Default generator, using `Math.random`
   */
  export const defaultGenerator = Generator(() => Math.random() as Random.Value);

  /**
   * Return a Task that will generate floating numbers between [`min`, `max`].
   * Values are generated using {@link Random.Generator.number} with {@link Random.defaultGenerator}
   *
   * @example
   * ```typescript
   * const next = Random.number(-10, 10);
   * Task.unsafeRun(next);// Result.Ok(F); where F is a floating number between -10 and 10
   * ```
   * @param min - the minimum inclusive bound for generated value
   * @param max - the maximum inclusive bound for generated value
   */
  export function number(min: number, max: number, generator: Generator = defaultGenerator): Task<number, never> {
    return {
      taskRun: (resolveTask, rejectTask, cancelerRef) =>
        generator.taskRun((value) => resolveTask(min + (max - min) * value), rejectTask, cancelerRef),
    };
  }

  /**
   * Return a Task that will generate integers between [`min`, `max`].
   * Values are generated using {@link Random.Generator.int} with {@link Random.defaultGenerator}
   *
   * @example
   * ```typescript
   * const next = Random.int(-10, 10);
   * Task.unsafeRun(next);// Result.Ok(N); where N is an integer between -10 and 10
   * ```
   * @param min - the minimum inclusive bound for generated value
   * @param max - the maximum inclusive bound for generated value
   */
  export function int(min: Int, max: Int, generator: Generator = defaultGenerator): Task<Int, never> {
    return {
      taskRun: (resolveTask, rejectTask, cancelerRef) =>
        number(min, max, generator).taskRun((value) => resolveTask(floor(value)), rejectTask, cancelerRef),
    };
  }

  /**
   * Return a Task that will generate booleans.
   * Values are generated using {@link Random.Generator.boolean} with {@link Random.defaultGenerator}
   *
   * @example
   * ```typescript
   * const next = Random.boolean(0.7);
   * Task.unsafeRun(next);// Result.Ok(true|false);
   * ```
   * @param trueWeight - the probability to obtain true
   */
  export function boolean(trueWeight = 0.5, generator: Generator = defaultGenerator): Task<boolean, never> {
    return {
      taskRun: (resolveTask, rejectTask, cancelerRef) =>
        generator.taskRun((value) => resolveTask(value > trueWeight), rejectTask, cancelerRef),
    };
  }
}
