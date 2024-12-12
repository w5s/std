import type { Tag } from '@w5s/core-type';

type AnyObject = object;
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
type AnyFunction = Function;
type ObjectIdState = {
  currentId: ObjectId;
  refs: WeakMap<symbol | AnyObject | AnyFunction, ObjectId>;
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
      refs: new WeakMap<AnyObject, ObjectId>(),
    };
    globalAny[objectIdStateSymbol] = newState;

    return newState;
  }

  return state;
}

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
 * @param objectOrFunction - a non literal object
 */
export function objectId(objectOrFunction: symbol | AnyObject | AnyFunction): ObjectId {
  const state = useObjectIdState(globalThis);
  const id = state.refs.get(objectOrFunction);
  if (id === undefined) {
    const nextId = state.currentId;
    state.currentId = (nextId + 1) as ObjectId;
    state.refs.set(objectOrFunction, nextId);

    return nextId;
  }

  return id;
}
