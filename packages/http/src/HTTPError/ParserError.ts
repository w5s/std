import { ErrorClass } from '@w5s/error/dist/ErrorClass.js';

/**
 * A parsing error when the body cannot be parsed
 */
export class ParserError extends ErrorClass({
  errorMessage: 'Cannot parse response body',
  errorName: 'HTTPParserError',
}) {}
