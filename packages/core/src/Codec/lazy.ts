import type { Codec } from '../Codec.js';
import type { Option } from '../Option.js';
import { decode } from './decode.js';
import { encode } from './encode.js';
import { schema } from './schema.js';

/**
 * Returns a lazy evaluated codec. Useful for recursive structures.
 *
 * @example
 * ```typescript
 * interface Node {
 *   value: unknown,
 *   children: Node[]
 * }
 * const Node = object<Node>({
 *   content: string,
 *   responses: Codec.lazy(() => array(Node))
 * })
 * ```
 * @param getCodec - the accessor to the codec
 */
export function lazy<T>(getCodec: () => Codec<T>): Codec<T> {
  let ref: Option<Codec<T>>;
  // eslint-disable-next-line no-return-assign
  const resolve = () => ref ?? (ref = getCodec());
  return {
    codecDecode: (input) => decode(resolve(), input),
    codecEncode: (input) => encode(resolve(), input),
    codecSchema: () => schema(resolve()),
  };
}
