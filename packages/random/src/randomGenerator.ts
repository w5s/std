import { invariant } from '@w5s/invariant';
import type { Option, Ref, Task } from '@w5s/core';
import { useRef } from '@w5s/application';
import { wrap } from '@w5s/core/dist/Task/wrap.js';
import type { RandomValue } from './randomValue.js';
import { application } from './application.js';

export interface RandomGenerator extends Task<RandomValue, never> {}

/**
 * Return a new generator from a callback
 *
 * @example
 * ```typescript
 * const dummyGenerator = RandomGenerator(() => RandomValue.of(1));
 * unsafeRun(dummyGenerator); // 1
 * ```
 * @category Constructor
 * @param getNextValue - an impure function that returns a new value
 */
export function RandomGenerator(getNextValue: () => RandomValue): RandomGenerator {
  return wrap(({ resolve }) => resolve(getNextValue()));
}

export namespace RandomGenerator {
  /**
   * Unsafe generator, using `Math.random`
   */
  export const unsafe = RandomGenerator(() => Math.random() as RandomValue);

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
   * Safe crypto generator, using `crypto.getRandomValues`
   */
  export const crypto = RandomGenerator(() => {
    invariant(cryptoModule != null, `Crypto implementation not found`);
    cryptoModule.getRandomValues(cryptoBuffer);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return (cryptoBuffer[0]! / cryptoDenominator) as RandomValue;
  });
}

/**
 * Default generator
 */
export const defaultRandomGenerator: Ref<RandomGenerator> = useRef(
  application.state,
  'randomGenerator',
  RandomGenerator.crypto
);
