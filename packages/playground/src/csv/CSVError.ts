import { CustomError } from '@w5s/error';

export interface CSVError
  extends CustomError<{
    name: 'CSVError';
  }> {}
export const CSVError = CustomError.define<CSVError>({ errorName: 'CSVError' });
