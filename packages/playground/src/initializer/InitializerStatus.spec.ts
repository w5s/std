import { describe, it, expect } from 'vitest';
import { InitializerStatus } from './InitializerStatus.js';

describe('InitializerStatus', () => {
  it('should have correct values', () => {
    expect(InitializerStatus).toMatchSnapshot();
  });
});
