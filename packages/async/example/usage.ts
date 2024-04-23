import { Deferred } from '@w5s/async';

const deferred = new Deferred<number>();

// resolve
deferred.resolve(Date.now());

// reject
deferred.reject(new Error('Something went wrong!'));

await deferred.promise;
