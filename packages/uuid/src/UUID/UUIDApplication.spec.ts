import { describe, expect, it } from 'vitest';
import { UUIDApplication } from './UUIDApplication.js';

describe('UUIDApplication', () => {
  it('should be an app', () => {
    expect(UUIDApplication).toEqual(expect.objectContaining({ id: '@w5s/uuid' }));
  });
});
