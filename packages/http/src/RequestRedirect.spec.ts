import { describe, expect, it } from 'vitest';
import { RequestRedirect } from './RequestRedirect.js';

describe('RequestRedirect', () => {
  it('is an enum', () => {
    expect(RequestRedirect).toMatchSnapshot();
  });
});
