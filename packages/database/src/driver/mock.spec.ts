import { describe, it, expect, jest } from '@jest/globals';
import { Ref } from '@w5s/core';
import { sql } from '../sql.js';
import { DatabaseDriver } from '../driver.js';
import { Mock } from './mock.js';

describe('Mock', () => {
  const anyStatement = sql`SELECT author FROM books WHERE name=${'Toto'}`;
  it('should be registered as driver', () => {
    expect(DatabaseDriver.get('mock')).toBe(Mock);
  });
  describe('.adapter', () => {
    it('should be "mock"', () => {
      expect(Mock.adapter).toBe('mock');
    });
  });
  describe('.execute', () => {
    it('should use mockExecuteQuery function', async () => {
      const mockExecuteQuery = jest.fn(() => Promise.resolve('returnValue'));
      const mockClient = {
        databaseType: 'mock' as const,
        mockExecuteQuery,
      };
      const cancelerRef = Ref(jest.fn());
      await expect(Mock.execute(mockClient, anyStatement, cancelerRef)).resolves.toEqual('returnValue');
      expect(mockExecuteQuery).toHaveBeenCalledWith(anyStatement);
    });
  });
});
