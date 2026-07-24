import { describe, expect, it } from 'vitest';

import { Option } from './Option.js';
import { andThen } from './Option/andThen.js';
import { from } from './Option/from.js';
import { getOrElse } from './Option/getOrElse.js';
import { getOrThrow } from './Option/getOrThrow.js';
import { isNone } from './Option/isNone.js';
import { isSome } from './Option/isSome.js';
import { map } from './Option/map.js';
import { None } from './Option/None.js';
import { orElse } from './Option/orElse.js';
import { Some } from './Option/Some.js';

describe('Option', () => {
  it('is an alias to functions', () => {
    expect(Option).toEqual({
      andThen,
      from,
      getOrElse,
      getOrThrow,
      isNone,
      isSome,
      map,
      None,
      orElse,
      Some,
    });
  });
});
