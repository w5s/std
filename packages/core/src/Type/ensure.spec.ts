import { describe, expect, it } from 'vitest';
import { ensure } from './ensure.js';
import { define } from './define.js';

describe('#ensure', () => {
  const TestType = define<string>({
    typeName: 'String',
    hasInstance: (anyValue) => typeof anyValue === 'string',
  });

  it('throws an error only when not of type', () => {
    expect(() => ensure(TestType, '')).not.toThrow();
    expect(() => ensure(TestType, null)).toThrow(new Error('null is not a valid String'));
  });
});
