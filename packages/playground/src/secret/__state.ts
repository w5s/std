import { useGlobalValue } from '@w5s/global-storage';
import { meta } from './meta.js';

export type ObjectIdState = WeakMap<object, any>;

export const __state = useGlobalValue(
  meta.name,
  (): ObjectIdState => (new WeakMap<object, any>()),
);
