import type { Int } from './integer.js';
import type { Tag } from './type.js';

// eslint-disable-next-line @typescript-eslint/ban-types
type AnyObject = Object;
// eslint-disable-next-line @typescript-eslint/ban-types
type AnyFunction = Function;
type State = {
  currentId: ObjectId;
  refs: WeakMap<AnyObject | AnyFunction, ObjectId>;
};

const objectIdStateSymbol = Symbol.for('objectIdState');

function objectIdState(): State {
  // State should be avoided on module
  // Only for compatibility with hot reload we set the state on global object

  const globalAny: { [objectIdStateSymbol]?: State } = globalThis as Record<string, any>;
  const state = globalAny[objectIdStateSymbol];
  if (state === undefined) {
    const newState: State = {
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
export type ObjectId = Tag<Int, { objectId: true }>;

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
export function objectId(objectOrFunction: AnyObject | AnyFunction): ObjectId {
  const state = objectIdState();
  const id = state.refs.get(objectOrFunction);
  if (id === undefined) {
    const nextId = state.currentId;
    state.currentId = ((nextId as number) + 1) as ObjectId;
    state.refs.set(objectOrFunction, nextId);

    return nextId;
  }

  return id;
}
