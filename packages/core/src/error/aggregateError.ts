import { DataError } from '../dataError.js';

/**
 * An error to aggregate multiple errors
 */
export interface AggregateError<Errors extends any[]>
  extends DataError<{
    name: 'AggregateError';
    errors: Readonly<[...Errors]>;
  }> {}
/**
 * AggregateError constructor
 *
 * @category Constructor
 */
export const AggregateError = DataError.MakeGeneric(
  'AggregateError',
  (create) =>
    <T extends any[]>(params: DataError.Parameters<AggregateError<T>>): AggregateError<T> =>
      create(params)
);
