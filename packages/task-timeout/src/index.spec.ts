import { describe, it, expect } from 'vitest';
import * as Std from './index.js';

describe('index', () => {
  it('exports', () => {
    expect(new Set(Object.keys(Std))).toEqual(new Set(['timeout']));
  });
});
