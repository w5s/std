import { describe, expect, it } from 'vitest';
import { RequestMode } from './RequestMode.js';

describe('RequestMode', () => {
  it('is an enum', () => {
    expect(RequestMode).toMatchInlineSnapshot(`
      {
        "CORS": "cors",
        "Navigate": "navigate",
        "NoCORS": "no-cors",
        "SameOrigin": "same-origin",
        "codecDecode": [Function],
        "codecEncode": [Function],
        "codecSchema": [Function],
        "from": [Function],
        "hasInstance": [Function],
        "inspect": undefined,
        "typeName": "Enum",
        Symbol(w5s.enumKeys): [
          "SameOrigin",
          "CORS",
          "Navigate",
          "NoCORS",
        ],
        Symbol(w5s.enumValues): [
          "same-origin",
          "cors",
          "navigate",
          "no-cors",
        ],
      }
    `);
  });
});
