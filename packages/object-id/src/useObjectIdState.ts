import { $objectIdState } from './$objectIdState.js';
import type { ObjectId, ObjectIdParameter } from './objectId.js';

export interface ObjectIdState {
  /**
   * Current id number
   */
  currentId: ObjectId;
  /**
   * A WeakMap of value => id
   */
  refs: WeakMap<ObjectIdParameter, ObjectId>;
}

export function useObjectIdState(hostObject: Record<string | symbol, any>): ObjectIdState {
  // State should be avoided on module
  // Only for compatibility with hot reload we set the state on global object

  const globalAny: { [$objectIdState]?: ObjectIdState } = hostObject;
  const state = globalAny[$objectIdState];
  if (state === undefined) {
    const newState: ObjectIdState = {
      currentId: 1 as ObjectId,
      refs: new WeakMap<ObjectIdParameter, ObjectId>(),
    };
    globalAny[$objectIdState] = newState;

    return newState;
  }

  return state;
}
