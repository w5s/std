import type { Enum } from '@w5s/core/Enum';
import { define } from '@w5s/core/Enum/define';

export const RequestCredentials = define({
  typeName: 'RequestCredentials',
  Include: 'include',
  Omit: 'omit',
  SameOrigin: 'same-origin',
});

/**
 * HTTP credentials
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials
 */
export type RequestCredentials = Enum.ValueOf<typeof RequestCredentials>;
