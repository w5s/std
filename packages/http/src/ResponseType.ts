import type { Enum } from '@w5s/core/Enum';
import { define } from '@w5s/core/Enum/define';

export const ResponseType = define({
  Basic: 'basic',
  CORS: 'cors',
  Default: 'default',
  Error: 'error',
  Opaque: 'opaque',
  OpaqueRedirect: 'opaqueredirect',
});

/**
 * HTTP Response type
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Response/type
 */
export type ResponseType = Enum.ValueOf<typeof ResponseType>;
