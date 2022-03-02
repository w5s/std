import { Task } from '@w5s/core';
import { DatabaseClient, DatabaseDriver } from './driver';
import { SQLStatement } from './sql';
import { SQLQuery } from './query';
import { DatabaseClientError } from './error';

/**
 * Execute the `sqlStatement` on an `client`
 *
 * @example
 * ```typescript
 * const query = executeQuery(client, SQLQuery.CreateTable({ tableName: 'test_table' }))
 * const result = await runTask(query);
 * if (Result.isOk(result)) {
 *   console.log(result.value)
 * } else {
 *   console.error(result.error);
 * }
 * ```
 * @param client created with a database adapter `createEnvironment(environmentConfig)` function
 * @param sqlOrQuery SQL query object or a raw sql statement
 */
export function executeQuery(
  client: DatabaseClient,
  sqlOrQuery: SQLStatement | SQLQuery
): Task.Async<unknown, DatabaseClientError> {
  const driver = DatabaseDriver.get(client.databaseType);

  return Task.Async(async ({ ok, error }) => {
    try {
      const sqlStatement = SQLStatement.hasInstance(sqlOrQuery) ? sqlOrQuery : SQLQuery.toSQLStatement(sqlOrQuery);
      const returnValue = await driver.executeQuery(client, sqlStatement);
      return ok(returnValue);
    } catch (error_: unknown) {
      const caughtError = await driver.handleError(error_);

      return error(caughtError);
    }
  });
}
