import type { ObjectLike, Tag } from '@w5s/core-type';

/**
 * Type representing values that can have an {@link ObjectId}
 *
 * Alias of {@link ObjectLike}
 */
export type ObjectIdParameter = ObjectLike;

type ObjectIdState = {
  currentId: ObjectId;
  refs: WeakMap<ObjectIdParameter, ObjectId>;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const objectIdStateSymbol: unique symbol = Symbol.for('@w5s/object-id.state') as any;

export function useObjectIdState(hostObject: Record<string | symbol, any>): ObjectIdState {
  // State should be avoided on module
  // Only for compatibility with hot reload we set the state on global object

  const globalAny: { [objectIdStateSymbol]?: ObjectIdState } = hostObject;
  const state = globalAny[objectIdStateSymbol];
  if (state === undefined) {
    const newState: ObjectIdState = {
      currentId: 1 as ObjectId,
      refs: new WeakMap<ObjectIdParameter, ObjectId>(),
    };
    globalAny[objectIdStateSymbol] = newState;

    return newState;
  }

  return state;
}

const objectIdState = useObjectIdState(globalThis);

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
