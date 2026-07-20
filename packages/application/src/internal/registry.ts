import { useGlobal } from '@w5s/global-storage';
import { meta } from '../meta.js';
import type { Ref } from '@w5s/core';
import type { StateKey } from '../StateKey.js';

export const registry = useGlobal(meta.name + '/useRefRegistry', () => new WeakMap<object, Map<StateKey, Ref<unknown>>>());
