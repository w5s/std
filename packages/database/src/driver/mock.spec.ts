import { describe, test, expect, jest } from '@jest/globals';
import { sql } from '../sql.js';
import { DatabaseDriver } from '../driver.js';
import { Mock } from './mock.js';

describe('Mock', () => {
  const anyStatement = sql`SELECT author FROM books WHERE name=${'Toto'}`;
  test('should be registered as driver', () => {
    expect(DatabaseDriver.get('mock')).toBe(Mock);
  });
  describe('.adapter', () => {
    test('should be "mock"', () => {
      expect(Mock.adapter).toBe('mock');
    });
  });
  describe('.executeQuery()', () => {
    test('should use mockExecuteQuery function', async () => {
      const mockExecuteQuery = jest.fn(() => Promise.resolve('returnValue'));
      const mockClient = {
        databaseType: 'mock' as const,
        mockExecuteQuery,
      };
      await expect(Mock.executeQuery(mockClient, anyStatement)).resolves.toEqual('returnValue');
      expect(mockExecuteQuery).toHaveBeenCalledWith(anyStatement);
    });
  });
});
