import { describe, expect, it } from 'vitest';
import { orElse } from './orElse.js';
import { None } from './None.js';
import { Some } from './Some.js';

describe(orElse, () => {
  it('should return callback result when None', () => {
    expect(orElse(None, () => Some('foo'))).toEqual(Some('foo'));
  });
  it('should return identity when Some', () => {
    expect(orElse(Some('foo'), () => Some('bar'))).toEqual(Some('foo'));
  });
});
