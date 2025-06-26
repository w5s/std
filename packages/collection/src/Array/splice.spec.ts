import { describe, it, expect } from 'vitest';
import { splice } from './splice.js';
import { empty } from './empty.js';

describe(splice, () => {
  it('should return unchanged when empty', () => {
    const array = empty();
    expect(splice(array, 0, 1)).toBe(empty());
  });
  it('handles negative index ', () => {
    const array = ['a', 'b', 'c'];
    expect(splice(array, -1, 1, '$')).toEqual(['a', 'b', '$']);
    expect(splice(array, -array.length - 1, 1, '$')).toEqual(['$', 'b', 'c']);
  });
  it('handles start >= array.length', () => {
    const array = ['a', 'b', 'c'];
    expect(splice(array, array.length, 1, '$')).toEqual(['a', 'b', 'c', '$']);
    expect(splice(array, array.length, 1, '$')).toEqual(['a', 'b', 'c', '$']);
  });
  it('should remove elements correctly', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = splice(arr, 1, 2); // Remove 2 elements starting at index 1
    expect(result).toEqual([1, 4, 5]);
  });
  it('should insert elements correctly', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = splice(arr, 2, 0, 6, 7); // Insert 6, 7 at index 2
    expect(result).toEqual([1, 2, 6, 7, 3, 4, 5]);
  });
  it('should replace elements correctly', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = splice(arr, 1, 2, 6, 7); // Replace 2 elements at index 1 with 6, 7
    expect(result).toEqual([1, 6, 7, 4, 5]);
  });
  it('should handle negative start index correctly', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = splice(arr, -2, 1, 6); // Start from the second last and replace one element
    expect(result).toEqual([1, 2, 3, 6, 5]);
  });
  it('should return a new array and not mutate the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = splice(arr, 1, 2);
    expect(result).toEqual([1, 4, 5]);
    expect(arr).toEqual([1, 2, 3, 4, 5]); // Original array should remain unchanged
  });
  it('should handle out-of-bound start index', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = splice(arr, 10, 1);
    expect(result).toEqual([1, 2, 3, 4, 5]); // No change expected
  });
  it('should handle removing more elements than available', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = splice(arr, 2, 10);
    expect(result).toEqual([1, 2]); // Remove all elements from index 2
  });
});
