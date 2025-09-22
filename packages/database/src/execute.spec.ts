import { describe, it, expect, vi } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { executeQuery } from './execute.js';
import { DatabaseError } from './error.js';
import { sql } from './sql.js';
import { SQLQuery } from './SQLQuery.js';
import './driver/all.js';

describe(executeQuery, () => {
  const expectTask = withTask(expect);
  const anyQuery = sql`SELECT id from table`;
  const createClient = () =>
    ({
      databaseType: 'mock',
      mockExecuteQuery: vi.fn(() => Promise.reject<unknown>(new Error('NotImplemented'))),
      mockQueryToStatement: vi.fn(SQLQuery.toSQLStatement),
    }) as const;

  it('should forward query execution to environment', async () => {
    const client = createClient();
    await expectTask(executeQuery(client, anyQuery)).toRejectAsync(expect.any(Object));
    expect(client.mockExecuteQuery).toHaveBeenCalledWith(anyQuery);
  });

  it('should return Result.Ok of environment.executeQuery if promise resolved', async () => {
    const client = createClient();
    client.mockExecuteQuery.mockResolvedValue('TestReturn');
    await expectTask(executeQuery(client, anyQuery)).toResolveAsync('TestReturn');
  });

  it('should return Result.Error of environment.executeQuery if promise rejected', async () => {
    const client = createClient();
    client.mockExecuteQuery.mockRejectedValue('MockClientError');
    await expectTask(executeQuery(client, anyQuery)).toRejectAsync(new DatabaseError({ cause: 'MockClientError' }));
  });

  it('should convert to sql statement', async () => {
    const client = createClient();
    client.mockExecuteQuery.mockResolvedValue(() => []);
    const task = executeQuery(client, SQLQuery.CreateSchema({ schemaName: 'test' }));
    await expectTask(task).toResolveAsync(expect.anything());
    expect(client.mockExecuteQuery).toHaveBeenLastCalledWith(sql`CREATE SCHEMA test`);
  });
});
