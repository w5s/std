import type { Tag as CoreTypeTag } from '@w5s/core-type';

import type { Callable } from './Callable.js';
import type { Type } from './Type.js';

import { define } from './Tag/define.js';

/**
 * Alias of {@link @w5s/core-type!Tag}
 *
 */
export type Tag<T extends string | symbol> = CoreTypeTag<T>;

/**
 * @namespace
 */
export const Tag = {
  define,
};
export namespace Tag {
  export interface Module<From, To extends From> extends Callable<(value: From) => To>, Type.Module<To> {
    /**
     * Convert an underlying type to a tagged type
     * Alias to `wrap(value)`
     *
     * @param value
     */
    (value: From): To;

    /**
     * Convert a tagged value to the underlying type
     *
     * @category Type
     * @param value
     */
    unwrap(value: To): From;

    /**
     * Convert an underlying type to a tagged type
     *
     * @category Type
     * @param value
     */
    wrap(value: From): To;
  }

  export interface Parameters<T> extends Type.Parameters<T> {}
}
