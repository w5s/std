import { describe, it, expect } from 'vitest';
import { HTTPError } from './HTTPError.js';

describe('HTTPError.InvalidURL', () => {
  it('should constructor new error', () => {
    expect(new HTTPError.InvalidURL({ message: 'test', input: 'abc' })).toEqual(
      expect.objectContaining({
        // _: 'DataError',
        name: 'HTTPInvalidURLError',
        message: 'test',
        input: 'abc',
      }),
    );
  });
});
describe('HTTPError.NetworkError', () => {
  it('should constructor new error', () => {
    expect(new HTTPError.NetworkError({ message: 'test' })).toEqual(
      expect.objectContaining({
        // _: 'DataError',
        name: 'HTTPNetworkError',
        message: 'test',
      }),
    );
  });
});
describe('HTTPError.ParserError', () => {
  it('should constructor new error', () => {
    expect(new HTTPError.ParserError({ message: 'test' })).toEqual(
      expect.objectContaining({
        // _: 'DataError',
        name: 'HTTPParserError',
        message: 'test',
      }),
    );
  });
});
