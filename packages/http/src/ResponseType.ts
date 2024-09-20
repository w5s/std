import { Enum } from '@w5s/core/dist/Enum.js';

export const ResponseType = Enum.define({
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
