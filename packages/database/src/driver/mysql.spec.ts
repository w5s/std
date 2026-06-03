import type * as mysql from 'mysql';
import { describe, it, expect, vi, type Mocked } from 'vitest';
import { sql } from '../sql.js';
import { DatabaseDriver } from '../driver.js';
import { MySQL } from './mysql.js';

describe('MySQL', () => {
  const anyCanceler = { cancel() {} };
  const anyStatement = sql`SELECT author FROM books WHERE name=${'Toto'}`;
  const mockConnection = (connectionProperties?: any): Mocked<mysql.Connection> => {
    const connection: Mocked<mysql.Connection> = {
      query: vi.fn<mysql.Connection['query']>(
        // @ts-ignore mock partial signature
        (_sql, _params, callback?) => callback(null, []),
      ),
      connect: vi.fn(),
      end: vi.fn(),
      ...connectionProperties,
    };
    vi.spyOn(MySQL, 'createConnection').mockImplementation(
      // @ts-ignore All methods are not required
      () => connection,
    );

    return connection;
  };

  const anyClient = {
    databaseType: 'mysql' as const,
    host: 'foo.com',
  };

  it('should be registered as driver', () => {
    expect(DatabaseDriver.get('mysql')).toBe(MySQL);
  });
  describe('.adapter', () => {
    it('should be "sqlite3"', () => {
      expect(MySQL.adapter).toBe('mysql');
    });
  });

  describe('.execute', () => {
    it('should open connection', async () => {
      mockConnection();
      const client = {
        databaseType: 'mysql',
        host: 'foo.com',
      } as const;
      await MySQL.execute(client, anyStatement, anyCanceler);

      expect(MySQL.createConnection).toHaveBeenLastCalledWith(client);
    });
    it('should send query to connection', async () => {
      const query = vi.fn<mysql.QueryFunction>(
        // @ts-ignore mock partial signature
        (_sql, _params, callback) => callback(null, 2),
      );
      mockConnection({
        query,
      });
      await MySQL.execute(anyClient, anyStatement, anyCanceler);

      expect(query).toHaveBeenLastCalledWith('SELECT author FROM books WHERE name=?', ['Toto'], expect.any(Function));
    });

    it('should close connection', async () => {
      const end = vi.fn();
      mockConnection({
        end,
      });
      await MySQL.execute(anyClient, anyStatement, anyCanceler);
      expect(end).toHaveBeenCalledTimes(1);
    });

    it('should close connection when callback error', async () => {
      const end = vi.fn<mysql.Connection['end']>();
      const query = vi.fn<mysql.Connection['query']>(
        // @ts-ignore mock partial signature
        (_queryObject, callback) => callback(new Error('mock error'), null),
      );
      mockConnection({
        end,
        query,
      });
      await expect(MySQL.execute(anyClient, anyStatement, anyCanceler)).rejects.toThrow();
      expect(end).toHaveBeenCalledTimes(1);
    });
  });
});
