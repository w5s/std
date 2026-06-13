import { Tag } from '@w5s/core/Tag';

/**
 * A type representing a unique identifier for a fiber.
 */
export type FiberId = number & Tag<'FiberId'>;

/**
 * A tag representing a unique identifier for a fiber.
 *
 * @namespace
 */
export const FiberId = Tag.define<number, FiberId>({
  typeName: 'FiberId',
  hasInstance: (value) => typeof value === 'number',
});
