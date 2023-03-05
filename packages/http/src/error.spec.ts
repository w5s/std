import { describe, it, expect } from '@jest/globals';
import { HTTPError } from './error.js';

describe('HTTPError.InvalidURL', () => {
  it('should constructor new error', () => {
    expect(HTTPError.InvalidURL({ message: 'test', input: 'abc' })).toEqual(
      expect.objectContaining({
        _: 'DataError',
        name: 'HTTPInvalidURLError',
        message: 'test',
        input: 'abc',
      })
    );
  });
});
describe('HTTPError.NetworkError', () => {
  it('should constructor new error', () => {
    expect(HTTPError.NetworkError({ message: 'test' })).toEqual(
      expect.objectContaining({
        _: 'DataError',
        name: 'HTTPNetworkError',
        message: 'test',
      })
    );
  });
});
describe('HTTPError.ParserError', () => {
  it('should constructor new error', () => {
    expect(HTTPError.ParserError({ message: 'test' })).toEqual(
      expect.objectContaining({
        _: 'DataError',
        name: 'HTTPParserError',
        message: 'test',
      })
    );
  });
});
