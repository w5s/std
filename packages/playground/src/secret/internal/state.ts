import { useGlobal } from '@w5s/global-storage';
import { meta } from '../meta.js';

export type SecretState = WeakMap<object, any>;

export const state = useGlobal(
  meta.name,
  (): SecretState => (new WeakMap<object, any>()),
);
