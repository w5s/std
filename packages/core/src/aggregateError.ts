import { defineCustomErrorWith, type CustomError, type CustomErrorParameters } from '@w5s/error';

/**
 * An error to aggregate multiple errors
 */
export interface AggregateError<Errors extends any[]>
  extends CustomError<{
    name: 'AggregateError';
    errors: Readonly<[...Errors]>;
  }> {}
/**
 * AggregateError constructor
 *
 * @category Constructor
 */
export const AggregateError = defineCustomErrorWith(
  'AggregateError',
  (create) =>
    <T extends any[]>(params: CustomErrorParameters<AggregateError<T>>): AggregateError<T> =>
      create(params)
);
