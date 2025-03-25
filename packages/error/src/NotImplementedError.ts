import { ErrorClass } from './ErrorClass.js';

/**
 * NotImplementedError constructor
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
