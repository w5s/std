import { describe, it, expect } from 'vitest';
import { Option } from './Option.js';
import { Some } from './Option/Some.js';
import { None } from './Option/None.js';
import { andThen } from './Option/andThen.js';
import { from } from './Option/from.js';
import { getOrElse } from './Option/getOrElse.js';
import { getOrThrow } from './Option/getOrThrow.js';
import { isNone } from './Option/isNone.js';
import { isSome } from './Option/isSome.js';
import { map } from './Option/map.js';
import { orElse } from './Option/orElse.js';

describe('Option', () => {
  it('is an alias to functions', () => {
    expect(Option).toEqual({
      Some,
      None,
      andThen,
      from,
      getOrElse,
      getOrThrow,
      isNone,
      isSome,
      map,
      orElse,
    });
  });
});
