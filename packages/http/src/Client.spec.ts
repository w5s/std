import { describe, expect, it } from 'vitest';
import { Client } from './Client.js';

describe(Client, () => {
  it('constructs a client', () => {
    expect(Client()).toEqual({
      responseTimeout: 'default',
    });
  });
});
