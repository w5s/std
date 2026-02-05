import type { ObjectLike, Tag } from '@w5s/core-type';
import { objectIdState } from './objectIdState.js';

/**
 * Type representing values that can have an {@link ObjectId}
 *
 * Alias of {@link ObjectLike}
 */
export type ObjectIdParameter = ObjectLike;

/**
 * Type representing a unique object id
 */
export type ObjectId = number & Tag<'ObjectId'>;

/**
 * Return a unique identifier for an object or function
 *
 * @example
 * ```typescript
 * const object = {};
 * objectId(object);// an integer
 * ```
 * @param objectLike - a non literal object
 */
export function objectId(objectLike: ObjectIdParameter): ObjectId {
  const id = objectIdState.refs.get(objectLike);
  if (id === undefined) {
    const nextId = objectIdState.currentId;
    objectIdState.currentId = (nextId + 1) as ObjectId;
    objectIdState.refs.set(objectLike, nextId);

    return nextId;
  }

  return id;
}
