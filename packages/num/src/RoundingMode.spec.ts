import { describe, it, expect } from 'vitest';
import { RoundingMode } from './RoundingMode.js';

describe('RoundingMode', () => {
  it('has values', () => {
    expect(RoundingMode).toMatchSnapshot();
  });
});
