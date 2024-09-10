import { describe, expect, it } from 'vitest';
import { RequestRedirect } from './RequestRedirect.js';

describe('RequestRedirect', () => {
  it('is an enum', () => {
    expect(RequestRedirect).toMatchInlineSnapshot(`
      {
        "Error": "error",
        "Follow": "follow",
        "Manual": "manual",
        "codecDecode": [Function],
        "codecEncode": [Function],
        "codecSchema": [Function],
        "from": [Function],
        "hasInstance": [Function],
        "inspect": undefined,
        "typeName": "Enum",
        Symbol(w5s.enumKeys): [
          "Follow",
          "Error",
          "Manual",
        ],
        Symbol(w5s.enumValues): [
          "follow",
          "error",
          "manual",
        ],
      }
    `);
  });
});
