import * as mysql from 'mysql';
import { sql } from '../sql';
import { DatabaseDriver } from '../driver';
import { MySQL } from './mysql';

describe('MySQL', () => {
  const anyStatement = sql`SELECT author FROM books WHERE name=${'Toto'}`;
  const mockConnection = (connectionProperties?: any) => {
    const connection = {
      query: jest.fn((_sql, _params, callback) => callback(null, [])),
      connect: jest.fn(),
      end: jest.fn(),
      ...connectionProperties,
    };
    jest.spyOn(MySQL, 'createConnection').mockImplementation(
      // @ts-ignore All methods are not required
      () => connection
    );

    return connection;
  };

  const anyClient = {
    databaseType: 'mysql' as const,
    host: 'foo.com',
  };

  test('should be registered as driver', () => {
    expect(DatabaseDriver.get('mysql')).toBe(MySQL);
  });
  describe('.adapter', () => {
    test('should be "sqlite3"', () => {
      expect(MySQL.adapter).toBe('mysql');
    });
  });

  describe('.executeQuery()', () => {
    test('should open connection', async () => {
      mockConnection();
      const client = {
        databaseType: 'mysql',
        host: 'foo.com',
      } as const;
      await MySQL.executeQuery(client, anyStatement);

      expect(MySQL.createConnection).toHaveBeenLastCalledWith(client);
    });
    test('should send query to connection', async () => {
      const query = jest.fn((_sql: string, _params: any, callback: (error: Error | null, result: number) => void) => {
        callback(null, 2);
      });
      mockConnection({
        query,
      });

      await MySQL.executeQuery(anyClient, anyStatement);

      expect(query).toHaveBeenLastCalledWith('SELECT author FROM books WHERE name=?', ['Toto'], expect.any(Function));
    });

    test('should close connection', async () => {
      const end = jest.fn();
      mockConnection({
        end,
      });

      await MySQL.executeQuery(anyClient, anyStatement);
      expect(end).toHaveBeenCalledTimes(1);
    });

    test('should close connection when callback error', async () => {
      const end = jest.fn();
      const query = jest.fn(
        (queryObject: mysql.Query, callback: (error: Error | null, result: number | null) => void) => {
          callback(new Error('mock error'), null);
        }
      );
      mockConnection({
        end,
        query,
      });

      await expect(MySQL.executeQuery(anyClient, anyStatement)).rejects.toThrow();
      expect(end).toHaveBeenCalledTimes(1);
    });
  });
});
