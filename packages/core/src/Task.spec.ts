import { describe, it, expect } from 'vitest';
import { Task } from './Task.js';
import { resolve } from './Task/resolve.js';
import { all } from './Task/all.js';
import { allSettled } from './Task/allSettled.js';
import { andRun } from './Task/andRun.js';
import { andThen } from './Task/andThen.js';
import { any } from './Task/any.js';
import { create } from './Task/create.js';
import { hasInstance } from './Task/hasInstance.js';
import { map } from './Task/map.js';
import { mapError } from './Task/mapError.js';
import { orElse } from './Task/orElse.js';
import { reject } from './Task/reject.js';
import { tryCall } from './Task/tryCall.js';
import { unsafeRun } from './Task/unsafeRun.js';
import { unsafeRunOk } from './Task/unsafeRunOk.js';
import { from } from './Task/from.js';

describe('Task', () => {
  it('is an alias to functions', () => {
    expect(Task).toEqual({
      all,
      allSettled,
      andRun,
      andThen,
      any,
      create,
      from,
      hasInstance,
      map,
      mapError,
      orElse,
      reject,
      resolve,
      tryCall,
      unsafeRun,
      unsafeRunOk,
    });
  });
});
