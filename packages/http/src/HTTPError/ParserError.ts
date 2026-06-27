import { ErrorClass } from '@w5s/error/ErrorClass';

/**
 * A parsing error when the body cannot be parsed
 */
export class ParserError extends ErrorClass({
  errorName: 'HTTPParserError',
  errorMessage: 'Cannot parse response body',
}) {}
