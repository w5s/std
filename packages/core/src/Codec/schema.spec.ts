import { describe, expect, it } from 'vitest';
import { schema } from './schema.js';
import { Symbol } from '../Symbol.js';

describe(schema, () => {
  it('should call __schema__', () => {
    const codec = {
      [Symbol.schema]: () => ({ type: 'string' }),
    };
    expect(schema(codec)).toEqual({ type: 'string' });
  });
});
