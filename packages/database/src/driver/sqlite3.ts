import { Database } from 'sqlite3';
import { SQLStatement } from '../sql.js';
import { AbstractDatabase } from '../client.js';
import { DatabaseDriver } from '../driver.js';

function sqlite3SQLStatement(statement: SQLStatement) {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {
    sql: SQLStatement.format(statement, {
      formatValue: () => '?',
    }).replace(/UNIX_TIMESTAMP\(\)/, "strftime('%s','now')"),
    params: statement.values,
  };
}

export interface SQLite3Client extends AbstractDatabase<'sqlite3'> {
  filename: string;
}
export const SQLite3 = {
  createDatabase(filename: string) {
    return new Database(filename);
  },
  ...DatabaseDriver.Make(
    'sqlite3',
    async (sqlite3Client: SQLite3Client, sqlStatement: SQLStatement): Promise<unknown> => {
      const { sql, params } = sqlite3SQLStatement(sqlStatement);
      const database = SQLite3.createDatabase(sqlite3Client.filename);
      const queryResultPromise = new Promise((resolve, reject) => {
        database.all(sql, params, (error, result) => (error != null ? reject(error) : resolve(result)));
      });
      // eslint-disable-next-line promise/prefer-await-to-then
      return queryResultPromise.finally(() => database.close());
    }
  ),
};

declare module '@w5s/database' {
  interface DatabaseDriverMap {
    sqlite3: SQLite3Client;
  }
}

DatabaseDriver.set('sqlite3', SQLite3);
