import { describe, expect, it } from 'vitest';
import { AggregateError } from './AggregateError.js';

describe(AggregateError, () => {
  it('is an alias to globalThis.AggregateError', () => {
    expect(AggregateError).toBe(globalThis.AggregateError);
  });
});
