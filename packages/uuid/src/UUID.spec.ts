import { describe, it, expect } from 'vitest';
import { UUIDApplication } from './UUID/UUIDApplication.js';
import { UUID } from './UUID.js';

describe('UUID', () => {
  it('is an alias to functions', () => {
    expect(UUID).toEqual(expect.objectContaining(UUIDApplication));
  });
});
