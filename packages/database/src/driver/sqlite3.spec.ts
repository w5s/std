import { describe, it, expect, vi, type Mocked } from 'vitest';
import { Ref } from '@w5s/core';
import type { Database } from 'sqlite3';
import { sql } from '../sql.js';
import { DatabaseDriver } from '../driver.js';
import { SQLite3 } from './sqlite3.js';

const mockDatabase = (): Mocked<Database> => {
  const database: Mocked<Database> = {
    // @ts-ignore All methods are not required
    all: vi.fn<Database['all']>((_sql, _values, callback?) => callback(null, null)),
    close: vi.fn(),
  } as any;
  vi.spyOn(SQLite3, 'createDatabase').mockImplementation(
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

  it('should be registered as driver', () => {
    expect(DatabaseDriver.get('sqlite3')).toBe(SQLite3);
  });
  describe('.adapter', () => {
    it('should be "sqlite3"', () => {
      expect(SQLite3.adapter).toBe('sqlite3');
    });
  });

  describe('.execute', () => {
    it('should send query to Database', async () => {
      const { all } = mockDatabase();
      const cancelerRef = Ref(() => {});

      await SQLite3.execute(anyClient, anyStatement, cancelerRef);

      expect(all).toHaveBeenLastCalledWith('SELECT ?', ['42'], expect.any(Function));
    });

    it('should close connection', async () => {
      const { close } = mockDatabase();
      const cancelerRef = Ref(() => {});

      await SQLite3.execute(anyClient, anyStatement, cancelerRef);
      expect(close).toHaveBeenCalled();
    });

    it('should close connection when callback error', async () => {
      const { all, close } = mockDatabase();
      all.mockImplementation(
        // @ts-ignore mock partial signature
        (_sqlObject, _values, callback) => callback(new Error('MockSQLite3Error'), null)
      );
      const cancelerRef = Ref(() => {});

      await expect(
        SQLite3.execute(anyClient, sql`SELECT error FROM unknown_wrong_table;`, cancelerRef)
      ).rejects.toThrow();
      expect(close).toHaveBeenCalled();
    });
  });
});
