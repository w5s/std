import type { JSONPrimitive } from '@w5s/core-type';
import type { Type } from '../Type.js';
import { define } from './define.js';

export function constant<const Value extends JSONPrimitive>(value: Value): Type.Module<Value> {
  return define({
    typeName: String(value),
    hasInstance: (anyValue): boolean => anyValue === value,
    codecSchema: () => ({
      const: value,
    }),
  });
}
