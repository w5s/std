import { describe, expect, it } from 'vitest';
import { schema } from './schema.js';

describe(schema, () => {
  it('should call codecSchema', () => {
    const codec = {
      codecSchema: () => ({ type: 'string' }),
    };
    expect(schema(codec)).toEqual({ type: 'string' });
  });
});
