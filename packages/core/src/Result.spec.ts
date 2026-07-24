import { describe, expect, it } from 'vitest';

import { Result } from './Result.js';
import { andThen } from './Result/andThen.js';
import { Error } from './Result/Error.js';
import { get } from './Result/get.js';
import { getError } from './Result/getError.js';
import { getOrElse } from './Result/getOrElse.js';
import { getOrThrow } from './Result/getOrThrow.js';
import { hasInstance } from './Result/hasInstance.js';
import { isError } from './Result/isError.js';
import { isOk } from './Result/isOk.js';
import { map } from './Result/map.js';
import { mapError } from './Result/mapError.js';
import { Ok } from './Result/Ok.js';
import { orElse } from './Result/orElse.js';
import { tryCall } from './Result/tryCall.js';

describe('Result', () => {
  it('is an alias to functions', () => {
    expect(Result).toEqual({
      andThen,
      Error,
      get,
      getError,
      getOrElse,
      getOrThrow,
      hasInstance,
      isError,
      isOk,
      map,
      mapError,
      Ok,
      orElse,
      tryCall,
    });
  });
});
