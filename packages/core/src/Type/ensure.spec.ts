import { describe, expect, it } from 'vitest';

import { define } from './define.js';
import { ensure } from './ensure.js';

describe('#ensure', () => {
  const TestType = define<string>({
    hasInstance: (anyValue) => typeof anyValue === 'string',
    typeName: 'String',
  });

  it('throws an error only when not of type', () => {
    expect(() => ensure(TestType, '')).not.toThrow();
    expect(() => ensure(TestType, null)).toThrow(new TypeError('null is not a valid String'));
  });
});
