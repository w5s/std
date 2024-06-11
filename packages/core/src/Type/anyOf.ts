import type { Type } from '../Type.js';
import { define } from '../Type/define.js';
import { schema } from '../Codec/schema.js';

/**
 * Return a union of all types
 *
 * @example
 * ```ts
 * const ABType = Type.anyOf(AType, BType);
 * ```
 * @param types
 */
export function anyOf<Types extends ReadonlyArray<Type.Module<any>>>(
  ...types: Types
): Type.Module<Type.TypeOf<Types[number]>> {
  return define({
    typeName: types.map((type) => type.typeName).join('|'),
    hasInstance: (anyValue) => types.some((type) => type.hasInstance(anyValue)),
    codecSchema: () => ({
      anyOf: types.map(schema),
    }),
  });
}
