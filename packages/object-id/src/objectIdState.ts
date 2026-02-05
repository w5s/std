import { useGlobalValue } from '@w5s/global-storage';
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

export const objectIdState = useGlobalValue(
  '@w5s/object-id',
  (): ObjectIdState => ({
    currentId: 1 as ObjectId,
    refs: new WeakMap<ObjectIdParameter, ObjectId>(),
  }),
);
