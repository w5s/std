import { describe, expect, it } from 'vitest';
import { match } from './match.js';
import { None } from './None.js';
import { Some } from './Some.js';

describe(match, () => {
  it('should call matchers.None when None', () => {
    expect(
      match(None, {
        None: () => 'none',
        Some: (value) => `${value}_some`,
      }),
    ).toEqual('none');
  });
  it('should call matchers.Some when Some', () => {
    expect(
      match(Some('foo'), {
        None: () => 'none',
        Some: (value) => `${value}_some`,
      }),
    ).toEqual('foo_some');
  });
});
