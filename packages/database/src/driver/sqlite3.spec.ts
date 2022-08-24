import { describe, test, expect, jest } from '@jest/globals';
import { Ref } from '@w5s/core';
import { sql } from '../sql.js';
import { DatabaseDriver } from '../driver.js';
import { SQLite3 } from './sqlite3.js';

const mockDatabase = () => {
  const database = {
    all: jest.fn((_sql, values, callback) => callback(null, null)),
    close: jest.fn(),
  };
  jest.spyOn(SQLite3, 'createDatabase').mockImplementation(
    // @ts-ignore All methods are not required
    () => database
  );

  return database;
};

describe('SQLite3', () => {
  const anyStatement = sql`SELECT ${'42'}`;
  const anyClient = {
    databaseType: 'sqlite3' as const,
    filename: ':memory:',
  };

  test('should be registered as driver', () => {
    expect(DatabaseDriver.get('sqlite3')).toBe(SQLite3);
  });
  describe('.adapter', () => {
    test('should be "sqlite3"', () => {
      expect(SQLite3.adapter).toBe('sqlite3');
    });
  });

  describe('.execute', () => {
    test('should send query to Database', async () => {
      const { all } = mockDatabase();
      const cancelerRef = Ref(() => {});

      await SQLite3.execute(anyClient, anyStatement, cancelerRef);

      expect(all).toHaveBeenLastCalledWith('SELECT ?', ['42'], expect.any(Function));
    });

    test('should close connection', async () => {
      const { close } = mockDatabase();
      const cancelerRef = Ref(() => {});

      await SQLite3.execute(anyClient, anyStatement, cancelerRef);
      expect(close).toHaveBeenCalled();
    });

    test('should close connection when callback error', async () => {
      const { all, close } = mockDatabase();
      all.mockImplementation((sqlObject, values, callback) => callback(new Error('MockSQLite3Error')));
      const cancelerRef = Ref(() => {});

      await expect(
        SQLite3.execute(anyClient, sql`SELECT error FROM unknown_wrong_table;`, cancelerRef)
      ).rejects.toThrow();
      expect(close).toHaveBeenCalled();
    });
  });
});
