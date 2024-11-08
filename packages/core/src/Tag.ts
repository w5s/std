import type { Tag as CoreTypeTag } from '@w5s/core-type';
import type { Callable } from './Callable.js';
import type { Codec } from './Codec.js';
import { define } from './Tag/define.js';
import type { Type } from './Type.js';

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
  export interface Parameters<T> extends Type.Parameters<T> {}

  export interface Module<From, To extends From> extends Type<To>, Codec<To>, Callable<(value: From) => To> {
    /**
     * Convert an underlying type to a tagged type
     * Alias to `wrap(value)`
     *
     * @param value
     */
    (value: From): To;
    /**
     * Convert an underlying type to a tagged type
     *
     * @param value
     */
    wrap(value: From): To;
    /**
     * Convert a tagged value to the underlying type
     *
     * @param value
     */
    unwrap(value: To): From;
  }
}
