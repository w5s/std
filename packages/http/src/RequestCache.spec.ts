import { describe, expect, it } from 'vitest';
import { RequestCache } from './RequestCache.js';

describe('RequestCache', () => {
  it('is an enum', () => {
    expect(RequestCache).toMatchInlineSnapshot(`
      {
        "Default": "default",
        "ForceCache": "force-cache",
        "NoCache": "no-cache",
        "NoStore": "no-store",
        "OnlyIfCached": "only-if-cached",
        "Reload": "reload",
        "codecDecode": [Function],
        "codecEncode": [Function],
        "codecSchema": [Function],
        "from": [Function],
        "hasInstance": [Function],
        "inspect": undefined,
        "typeName": "Enum",
        Symbol(w5s.enumKeys): [
          "Default",
          "NoStore",
          "Reload",
          "NoCache",
          "ForceCache",
          "OnlyIfCached",
        ],
        Symbol(w5s.enumValues): [
          "default",
          "no-store",
          "reload",
          "no-cache",
          "force-cache",
          "only-if-cached",
        ],
      }
    `);
  });
});
