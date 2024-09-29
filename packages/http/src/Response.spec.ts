import { describe, expect, it } from 'vitest';
import { Response } from './Response.js';
import { Status } from './Status.js';
import { from } from './Response/from.js';

describe(Response, () => {
  it('is an alias to functions', () => {
    expect(Response).toEqual(
      expect.objectContaining({
        from,
      })
    );
  });
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
