import { describe, expect, it } from 'vitest';
import { RequestCredentials } from './RequestCredentials.js';

describe('RequestCredentials', () => {
  it('is an enum', () => {
    expect(RequestCredentials).toMatchInlineSnapshot(`
      {
        "Include": "include",
        "Omit": "omit",
        "SameOrigin": "same-origin",
        "codecDecode": [Function],
        "codecEncode": [Function],
        "codecSchema": [Function],
        "from": [Function],
        "hasInstance": [Function],
        "inspect": undefined,
        "typeName": "Enum",
        Symbol(w5s.enumKeys): [
          "Include",
          "Omit",
          "SameOrigin",
        ],
        Symbol(w5s.enumValues): [
          "include",
          "omit",
          "same-origin",
        ],
      }
    `);
  });
});
