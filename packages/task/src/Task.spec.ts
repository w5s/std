import { describe, expect, it } from 'vitest';

import { Task } from './Task.js';
import { all } from './Task/all.js';
import { allKeyed } from './Task/allKeyed.js';
import { allSettled } from './Task/allSettled.js';
import { allSettledKeyed } from './Task/allSettledKeyed.js';
import { andRun } from './Task/andRun.js';
import { andThen } from './Task/andThen.js';
import { any } from './Task/any.js';
import { create } from './Task/create.js';
import { error } from './Task/error.js';
import { from } from './Task/from.js';
import { hasInstance } from './Task/hasInstance.js';
import { ignore } from './Task/ignore.js';
import { map } from './Task/map.js';
import { mapError } from './Task/mapError.js';
import { mapResult } from './Task/mapResult.js';
import { ok } from './Task/ok.js';
import { orElse } from './Task/orElse.js';
import { reject } from './Task/reject.js';
import { resolve } from './Task/resolve.js';
import { run } from './Task/run.js';
import { tryCall } from './Task/tryCall.js';

describe('Task', () => {
  it('is an alias to functions', () => {
    expect(Task).toEqual({
      all,
      allKeyed,
      allSettled,
      allSettledKeyed,
      andRun,
      andThen,
      any,
      create,
      error,
      from,
      hasInstance,
      ignore,
      map,
      mapError,
      mapResult,
      ok,
      orElse,
      reject,
      resolve,
      run,
      tryCall,
    });
  });
});
