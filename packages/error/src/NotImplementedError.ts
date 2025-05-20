import { ErrorClass } from './ErrorClass.js';

/**
 * The NotImplementedError object indicates an error that the current function was not implemented
 *
 * @example
 * ```typescript
 * function someFunction() {
 *   throw NotImplementedError();// message can be customized
 * }
 * ```
 */
export class NotImplementedError extends ErrorClass({
  errorName: 'NotImplementedError',
  errorMessage: 'Not implemented',
}) {}
