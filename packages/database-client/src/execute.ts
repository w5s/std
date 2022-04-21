import { Task } from '@w5s/core';
import { DatabaseClient, DatabaseDriver } from './driver.js';
import { SQLStatement } from './sql.js';
import { SQLQuery } from './query.js';
import { DatabaseClientError } from './error.js';

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
): Task<unknown, DatabaseClientError> {
  const driver = DatabaseDriver.get(client.databaseType);

  return Task(async ({ ok, error }) => {
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
