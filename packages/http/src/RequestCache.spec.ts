import { describe, expect, it } from 'vitest';
import { RequestCache } from './RequestCache.js';

describe('RequestCache', () => {
  it('is an enum', () => {
    expect(RequestCache).toMatchSnapshot();
  });
});
