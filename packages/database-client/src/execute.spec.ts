import { Result, Task } from '@w5s/core';
import { executeQuery } from './execute.js';
import { DatabaseClientError } from './error.js';
import { sql } from './sql.js';
import { SQLQuery } from './query.js';
import './driver/all.js';

describe(executeQuery, () => {
  const anyQuery = sql`SELECT id from table`;
  const createClient = () =>
    ({
      databaseType: 'mock',
      mockExecuteQuery: jest.fn(() => Promise.reject<unknown>(new Error('NotImplemented'))),
      mockQueryToStatement: jest.fn(SQLQuery.toSQLStatement),
    } as const);

  test('should forward query execution to environment', async () => {
    const client = createClient();
    await Task.unsafeRun(executeQuery(client, anyQuery));
    expect(client.mockExecuteQuery).toHaveBeenCalledWith(anyQuery);
  });

  test('should return Result.Ok of environment.executeQuery if promise resolved', async () => {
    const client = createClient();
    client.mockExecuteQuery.mockResolvedValue('TestReturn');
    await expect(Task.unsafeRun(executeQuery(client, anyQuery))).resolves.toEqual(Result.Ok('TestReturn'));
  });

  test('should return Result.Error of environment.executeQuery if promise rejected', async () => {
    const client = createClient();
    client.mockExecuteQuery.mockReturnValue(Promise.reject('MockClientError')); // eslint-disable-line prefer-promise-reject-errors
    await expect(Task.unsafeRun(executeQuery(client, anyQuery))).resolves.toEqual(
      Result.Error(DatabaseClientError({ cause: 'MockClientError' }))
    );
  });

  test('should convert to sql statement', async () => {
    const client = createClient();
    client.mockExecuteQuery.mockResolvedValue(() => []);
    await Task.unsafeRun(executeQuery(client, SQLQuery.CreateSchema({ schemaName: 'test' })));
    expect(client.mockExecuteQuery).toHaveBeenLastCalledWith(sql`CREATE SCHEMA test`);
  });
});
