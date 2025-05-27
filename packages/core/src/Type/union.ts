import type { Type } from '../Type.js';
import { define } from './define.js';
import { schema } from '../Codec/schema.js';
import { Symbol } from '../Symbol.js';

/**
 * Return a union of all types
 *
 * @example
 * ```typescript
 * const ABType = Type.anyOf(AType, BType);
 * ```
 * @param types
 */
export function union<Types extends ReadonlyArray<Type.Module<any>>>(
  ...types: Types
): Type.Module<Type.TypeOf<Types[number]>> {
  return define({
    typeName: types.map((type) => type.typeName).join('|'),
    hasInstance: (anyValue) => types.some((type) => type.hasInstance(anyValue)),
    [Symbol.schema]: () => ({
      anyOf: types.flatMap((type) => {
        const typeSchema = schema(type);

        return typeof typeSchema === 'object' && typeSchema !== null && 'anyOf' in typeSchema
          ? typeSchema['anyOf']
          : typeSchema;
      }),
    }),
  });
}
