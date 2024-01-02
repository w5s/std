import { type CustomError, defineCustomError, Error, TypeError } from '@w5s/error';

export interface MyError
  extends CustomError<{
    name: 'MyError';
    foo: string;
    bar: boolean;
  }> {}
export const MyError = defineCustomError<MyError>('MyError');

const myError = MyError({
  foo: 'this is foo',
  bar: true,
  cause: TypeError('this is the cause'),
});
console.log(myError instanceof Error); // true
