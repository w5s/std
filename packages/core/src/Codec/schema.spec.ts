import { describe, expect, it } from 'vitest';

import { Symbol } from '../Symbol.js';
import { schema } from './schema.js';

describe(schema, () => {
  it('should call __schema__', () => {
    const codec = {
      [Symbol.schema]: () => ({ type: 'string' }),
    };
    expect(schema(codec)).toEqual({ type: 'string' });
  });
});
