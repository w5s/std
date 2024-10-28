import { describe, expect, it } from 'vitest';
import { RequestCredentials } from './RequestCredentials.js';

describe('RequestCredentials', () => {
  it('is an enum', () => {
    expect(RequestCredentials).toMatchSnapshot();
  });
});
