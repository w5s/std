import { describe, expect, it } from 'vitest';
import { useRef } from './useRef.js';
import { useStorage } from './useStorage.js';

describe('useRef()', () => {
  const globalStorage = useStorage(globalThis);

  it('should initialize with initial value', () => {
    const ref = useRef('some_test_ref', 0);
    expect(ref.current).toBe(0);
    expect(globalStorage.get('some_test_ref')).toBe(0);
  });
  it('should implement set', () => {
    const ref = useRef('some_test_ref', 0);
    ref.current += 1;
    expect(ref.current).toBe(1);
    expect(globalStorage.get('some_test_ref')).toBe(1);
  });
});
