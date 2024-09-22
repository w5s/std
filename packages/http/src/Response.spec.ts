import { describe, expect, it } from 'vitest';
import { Response } from './Response.js';
import { Status } from './Status.js';

describe(Response, () => {
  it('returns a new instance', () => {
    expect(
      Response({
        url: 'my/url',
        body: 'some body',
        status: Status.OK,
      })
    ).toEqual({
      headers: {},
      ok: true,
      url: 'my/url',
      status: Status.OK,
      body: 'some body',
      redirected: false,
      type: 'default',
    });
  });
});
