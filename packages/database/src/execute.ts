import type { Task } from '@w5s/core';
import { wrap } from '@w5s/core/dist/Task/wrap.js';
import { type Database, DatabaseDriver } from './driver.js';
import { SQLStatement } from './sql.js';
import { SQLQuery } from './query.js';
import type { DatabaseError } from './error.js';

/**
 * Execute the `sqlStatement` on an `client`
 *
 * @example
 * ```typescript
 * const query = executeQuery(client, SQLQuery.CreateTable({ tableName: 'test_table' }))
 * const result = await Task.unsafeRun(query);
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

  return wrap(
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async ({ resolve, reject, canceler }) => {
      try {
        const sqlStatement = SQLStatement.hasInstance(sqlOrQuery) ? sqlOrQuery : SQLQuery.toSQLStatement(sqlOrQuery);
        const returnValue = await driver.execute(client, sqlStatement, canceler);
        resolve(returnValue);
      } catch (error_: unknown) {
        const caughtError = await driver.handleError(error_);

        reject(caughtError);
      }
    }
  );
}
