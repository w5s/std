import { describe, expect, it } from 'vitest';
import { ReferrerPolicy } from './ReferrerPolicy.js';

describe('ReferrerPolicy', () => {
  it('is an enum', () => {
    expect(ReferrerPolicy).toMatchInlineSnapshot(`
      {
        "Empty": "",
        "NoReferrer": "no-referrer",
        "NoReferrerWhenDowngrade": "no-referrer-when-downgrade",
        "Origin": "origin",
        "OriginWhenCrossOrigin": "origin-when-cross-origin",
        "SameOrigin": "same-origin",
        "StrictOrigin": "strict-origin",
        "StrictOriginWhenCrossOrigin": "strict-origin-when-cross-origin",
        "UnsafeURL": "unsafe-url",
        "codecDecode": [Function],
        "codecEncode": [Function],
        "codecSchema": [Function],
        "from": [Function],
        "hasInstance": [Function],
        "inspect": undefined,
        "typeName": "Enum",
        Symbol(w5s.enumKeys): [
          "Empty",
          "NoReferrer",
          "NoReferrerWhenDowngrade",
          "SameOrigin",
          "Origin",
          "StrictOrigin",
          "OriginWhenCrossOrigin",
          "StrictOriginWhenCrossOrigin",
          "UnsafeURL",
        ],
        Symbol(w5s.enumValues): [
          "",
          "no-referrer",
          "no-referrer-when-downgrade",
          "same-origin",
          "origin",
          "strict-origin",
          "origin-when-cross-origin",
          "strict-origin-when-cross-origin",
          "unsafe-url",
        ],
      }
    `);
  });
});
