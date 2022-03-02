import { DataError } from '@w5s/core';

export interface DatabaseClientError
  extends DataError<{
    name: 'DatabaseClientError';
  }> {}
export const DatabaseClientError = DataError.Make<DatabaseClientError>('DatabaseClientError');
