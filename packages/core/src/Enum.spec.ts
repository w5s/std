import { describe, expect, it } from 'vitest';
import { Enum } from './Enum.js';
import { define } from './Enum/define.js';
import { keys } from './Enum/keys.js';
import { values } from './Enum/values.js';
import { Symbol } from './Symbol.js';

describe('Enum', () => {
  it('is an alias to functions', () => {
    expect(Enum).toEqual({
      define,
      keys,
      values,
      enumKeys: Symbol.enumKeys,
      enumValues: Symbol.enumValues,
    });
  });
});
