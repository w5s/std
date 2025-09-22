import type { Task } from '@w5s/task';
import { from } from '@w5s/task/dist/Task/from.js';
import { type Database, DatabaseDriver } from './driver.js';
import { SQLStatement } from './sql.js';
import { SQLQuery } from './SQLQuery.js';
import type { DatabaseError } from './error.js';

/**
 * Execute the `sqlStatement` on an `client`
 *
 * @example
 * ```typescript
 * const query = executeQuery(client, SQLQuery.CreateTable({ tableName: 'test_table' }))
 * const result = await Task.run(query);
 * if (Result.isOk(result)) {
 *   console.log(result.value)
 * } else {
 *   console.error(result.error);
 * }
 * ```
 * @param client - created with a database adapter `createEnvironment(environmentConfig)` function
 * @param sqlOrQuery - SQL query object or a raw sql statement
 */
export function executeQuery(client: Database, sqlOrQuery: SQLStatement | SQLQuery): Task<unknown, DatabaseError> {
  const driver = DatabaseDriver.get(client.databaseType);

  return from(async ({ resolve, reject, canceler }) => {
    try {
      const sqlStatement = SQLStatement.hasInstance(sqlOrQuery) ? sqlOrQuery : SQLQuery.toSQLStatement(sqlOrQuery);
      const returnValue = await driver.execute(client, sqlStatement, canceler);
      resolve(returnValue);
    } catch (error_: unknown) {
      const caughtError = await driver.handleError(error_);

      reject(caughtError);
    }
  });
}
