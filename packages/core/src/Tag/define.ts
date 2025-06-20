import { Callable } from '../Callable.js';
import type { Tag } from '../Tag.js';
import { define as defineType } from '../Type/define.js';
import { ensure as ensureType } from '../Type/ensure.js';

/**
 * Returns a new Tag module
 *
 * @example
 * ```typescript
 * type Foo = string & Tag<'Foo'>;
 * const Foo = Tag.define<string, Foo>({
 *   typeName: 'Foo',
 *   hasInstance: (anyValue) => typeof anyValue === 'string',
 * });
 * ```
 */
export function define<From, To extends From>(parameters: Tag.Parameters<To>): Tag.Module<From, To> {
  const TagType = defineType<To>(parameters);

  function wrap(value: From): To {
    ensureType(TagType, value);
    return value;
  }

  function unwrap(value: To): From {
    return value as unknown as From;
  }

  return Callable({
    wrap,
    unwrap,
    ...TagType,
    [Callable.symbol]: (value: From) => wrap(value),
  });
}
