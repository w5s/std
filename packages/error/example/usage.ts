import { Error } from '@w5s/error/Error';
import { ErrorClass } from '@w5s/error/ErrorClass';
import { TypeError } from '@w5s/error/TypeError';

export class MyError extends ErrorClass({ errorName: 'MyError' })<{
  bar: boolean;
  foo: string;
}> {}

const myError = new MyError({
  bar: true,
  cause: TypeError('this is the cause'),
  foo: 'this is foo',
});

console.log(myError instanceof Error); // true
