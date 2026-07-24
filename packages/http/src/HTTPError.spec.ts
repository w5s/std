import { describe, expect, it } from 'vitest';

import { HTTPError } from './HTTPError.js';

describe('HTTPError.InvalidURL', () => {
  it('should constructor new error', () => {
    expect(new HTTPError.InvalidURL({ input: 'abc', message: 'test' })).toEqual(
      expect.objectContaining({
        input: 'abc',
        message: 'test',
        // _: 'DataError',
        name: 'HTTPInvalidURLError',
      }),
    );
  });
});
describe('HTTPError.NetworkError', () => {
  it('should constructor new error', () => {
    expect(new HTTPError.NetworkError({ message: 'test' })).toEqual(
      expect.objectContaining({
        message: 'test',
        // _: 'DataError',
        name: 'HTTPNetworkError',
      }),
    );
  });
});
describe('HTTPError.ParserError', () => {
  it('should constructor new error', () => {
    expect(new HTTPError.ParserError({ message: 'test' })).toEqual(
      expect.objectContaining({
        message: 'test',
        // _: 'DataError',
        name: 'HTTPParserError',
      }),
    );
  });
});
