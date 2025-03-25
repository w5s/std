import { ErrorClass, Error, TypeError } from '@w5s/error';

export class MyError extends ErrorClass({ errorName: 'MyError' })<{
  foo: string;
  bar: boolean;
}> {}

const myError = new MyError({
  foo: 'this is foo',
  bar: true,
  cause: TypeError('this is the cause'),
});
console.log(myError instanceof Error); // true
