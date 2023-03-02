import { invariant } from './invariant.js';
import type { Int } from './integer.js';
import type { Task } from './task.js';
import type { Tag } from './type.js';
import type { Option } from './option.js';
import type { Ref } from './ref.js';

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
   * Unsafe generator, using `Math.random`
   */
  export const unsafeGenerator = Generator(() => Math.random() as Random.Value);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const cryptoModule: Option<Pick<Crypto, 'getRandomValues'>> =
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    globalThis.crypto === undefined
      ? // eslint-disable-next-line unicorn/prefer-module
        typeof require === 'undefined'
        ? undefined
        : // eslint-disable-next-line global-require, @typescript-eslint/no-require-imports, unicorn/prefer-module, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-var-requires
          require('node:crypto').webcrypto
      : globalThis.crypto;

  const cryptoBuffer = new Uint32Array(1);
  const cryptoDenominator = 2 ** 32;

  /**
   * Unsafe generator, using `Math.random`
   */
  export const cryptoGenerator = Generator(() => {
    invariant(cryptoModule != null, `Crypto implementation not found`);
    cryptoModule.getRandomValues(cryptoBuffer);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return (cryptoBuffer[0]! / cryptoDenominator) as Random.Value;
  });

  /**
   * Default generator
   */
  export const defaultGeneratorRef: Ref<Generator> = { current: cryptoGenerator };

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
  export function number(
    min: number,
    max: number,
    generator: Generator = defaultGeneratorRef.current
  ): Task<number, never> {
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
  export function int(min: Int, max: Int, generator: Generator = defaultGeneratorRef.current): Task<Int, never> {
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
  export function boolean(trueWeight = 0.5, generator: Generator = defaultGeneratorRef.current): Task<boolean, never> {
    return {
      taskRun: (resolveTask, rejectTask, cancelerRef) =>
        generator.taskRun((value) => resolveTask(value > trueWeight), rejectTask, cancelerRef),
    };
  }
}
