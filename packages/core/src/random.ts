import { invariant } from './assert.js';
import type { Int } from './integer.js';
import { Task } from './task.js';
import type { Tag } from './type.js';

export namespace Random {
  export type Value = Tag<number, { min: 0; max: 1 }>;

  /**
   * Return a new random value from number 0<= N <=1.
   * An invariant error is thrown when invalid number is given
   *
   * @category Constructor
   * @param numeric numeric value >=0 and <=1
   */
  export function Value(numeric: number): Value {
    invariant(Value.hasInstance(numeric), `Random value should be between 0 and 1. Got ${numeric}`);

    return numeric as Value;
  }
  export namespace Value {
    /**
     * Return `true` if `anyValue` is a valid `Random.Value`
     *
     * @param anyValue an unknown value to be refined
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
   * @param getNextValue an impure function that returns a new value
   */
  export function Generator(getNextValue: () => Random.Value): Generator {
    return Task(({ ok }) => ok(getNextValue()));
  }
  export namespace Generator {
    const floor = (value: number) => Math.floor(value) as Int;

    /* eslint-disable @typescript-eslint/no-shadow */

    /**
     * Return a factory of Task that will generate floating numbers between [`min`, `max`]
     *
     * @example
     * ```typescript
     * const generator = Random.Generator.number(generator);
     * const next = generator(-10, 10);
     * Task.unsafeRun(next);// Result.Ok(F); where F is a floating number between -10 and 10
     * ```
     * @param generator a base random generator
     */
    export function number(generator: Generator) {
      return (min: number, max: number): Task<number, never> =>
        Task.map(generator, (value) => min + (max - min) * value);
    }

    /**
     * Return a factory of Task that will generate floating numbers between [`min`, `max`]
     *
     * @example
     * ```typescript
     * const generator = Random.Generator.int(generator);
     * const next = generator(-10, 10);
     * Task.unsafeRun(next);// Result.Ok(N); where N is an integer between -10 and 10
     * ```
     * @param generator a base random generator
     */
    export function int(generator: Generator) {
      const randomNumber = number(generator);

      return (min: Int, max: Int) => Task.map(randomNumber(min, max), floor);
    }

    /**
     * Return a factory of Task that will generate boolean using a `trueWeight` for the probability to return `true`
     *
     * @example
     * ```typescript
     * const generator = Random.Generator.boolean(generator);
     * const next = generator(0.7);
     * Task.unsafeRun(next);// Result.Ok(true|false);
     * ```
     * @param generator a base random generator
     */
    export function boolean(generator: Generator) {
      return (trueWeight = 0.5): Task<boolean, never> => Task.map(generator, (_) => _ > trueWeight);
    }
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
   * const next = Random.number(generator)(-10, 10);
   * Task.unsafeRun(next);// Result.Ok(F); where F is a floating number between -10 and 10
   * ```
   * @param min the minimum inclusive bound for generated value
   * @param max the maximum inclusive bound for generated value
   */
  export const number = Generator.number(defaultGenerator);

  /**
   * Return a Task that will generate integers between [`min`, `max`].
   * Values are generated using {@link Random.Generator.int} with {@link Random.defaultGenerator}
   *
   * @example
   * ```typescript
   * const next = Random.int(generator)(-10, 10);
   * Task.unsafeRun(next);// Result.Ok(N); where N is an integer between -10 and 10
   * ```
   * @param min the minimum inclusive bound for generated value
   * @param max the maximum inclusive bound for generated value
   */
  export const int = Generator.int(defaultGenerator);

  /**
   * Return a Task that will generate booleans.
   * Values are generated using {@link Random.Generator.boolean} with {@link Random.defaultGenerator}
   *
   * @example
   * ```typescript
   * const next = Random.boolean(generator)(0.7);
   * Task.unsafeRun(next);// Result.Ok(true|false);
   * ```
   * @param trueWeight the probability to obtain true
   */
  export const boolean = Generator.boolean(defaultGenerator);
}
