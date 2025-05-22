import type { UUID } from '../UUID.js';

/**
 * Converts a UUID to an array of uint32 values.
 *
 * @example
 * ```typescript
 * const uuid: UUID;
 * const parts = UUID.toUint32Array(uuid);
 * ```
 * @param self - the UUID to convert
 */
export function toUint32Array(self: UUID): Uint32Array {
  const returnValue = new Uint32Array(4);
  const hexString = self.replaceAll('-', '');

  for (let index = 0; index < 4; index += 1) {
    const hexSegment = hexString.slice(index * 8, (index + 1) * 8);
    returnValue[index] = Number.parseInt(hexSegment, 16);
  }
  return returnValue;
}
