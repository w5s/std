import { describe, expect, it } from 'vitest';
import { RequestDestination } from './RequestDestination.js';

describe('RequestDestination', () => {
  it('is an enum', () => {
    expect(RequestDestination).toMatchSnapshot();
  });
});
