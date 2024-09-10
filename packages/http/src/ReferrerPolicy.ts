import { Enum } from '@w5s/core/dist/Enum.js';

export const ReferrerPolicy = Enum.define({
  Empty: '',
  NoReferrer: 'no-referrer',
  NoReferrerWhenDowngrade: 'no-referrer-when-downgrade',
  SameOrigin: 'same-origin',
  Origin: 'origin',
  StrictOrigin: 'strict-origin',
  OriginWhenCrossOrigin: 'origin-when-cross-origin',
  StrictOriginWhenCrossOrigin: 'strict-origin-when-cross-origin',
  UnsafeURL: 'unsafe-url',
});
/**
 * HTTP referrer policy type
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Request/referrerPolicy
 */
export type ReferrerPolicy = Enum.ValueOf<typeof ReferrerPolicy>;
