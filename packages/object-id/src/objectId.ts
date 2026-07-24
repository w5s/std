import type { ObjectLike, Tag } from '@w5s/core-type';

import { state } from './internal/state.js';

/**
 * Type representing a unique object id
 */
export type ObjectId = number & Tag<'ObjectId'>;

/**
 * Type representing values that can have an {@link ObjectId}
 *
 * Alias of {@link ObjectLike}
 */
export type ObjectIdParameter = ObjectLike;

/**
 * Return a unique identifier for an object or function
 *
 * @example
 * ```typescript
 * const object = {};
 * objectId(object);// an integer
 * ```
 * @param objectLike a non literal object
 */
export function objectId(objectLike: ObjectIdParameter): ObjectId {
  const id = state.refs.get(objectLike);
  if (id === undefined) {
    const nextId = state.currentId;
    state.currentId = (nextId + 1) as ObjectId;
    state.refs.set(objectLike, nextId);

    return nextId;
  }

  return id;
}
