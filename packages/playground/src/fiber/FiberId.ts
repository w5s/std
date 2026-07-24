import { Tag } from '@w5s/core/dist/Tag.js';

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
  hasInstance: (value) => typeof value === 'number',
  typeName: 'FiberId',
});
