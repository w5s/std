import { describe, expect, it } from 'vitest';

import { Response } from './Response.js';
import { from } from './Response/from.js';
import { Status } from './Status.js';

describe(Response, () => {
  it('is an alias to functions', () => {
    expect(Response).toEqual(
      expect.objectContaining({
        from,
      }),
    );
  });
  it('returns a new instance', () => {
    expect(
      Response({
        body: 'some body',
        status: Status.OK,
        url: 'my/url',
      }),
    ).toEqual({
      body: 'some body',
      headers: {},
      ok: true,
      redirected: false,
      status: Status.OK,
      type: 'default',
      url: 'my/url',
    });
  });
});
