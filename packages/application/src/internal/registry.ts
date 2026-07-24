import type { Ref } from '@w5s/core';

import { useGlobal } from '@w5s/global-storage';

import type { StateKey } from '../StateKey.js';

import { meta } from '../meta.js';

export const registry = useGlobal(meta.name + '/useRefRegistry', () => new WeakMap<object, Map<StateKey, Ref<unknown>>>());
