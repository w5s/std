import type { Database } from 'sqlite3';

import { createRequire } from 'node:module';

import type { AbstractDatabase } from '../client.js';

import { DatabaseDriver } from '../driver.js';
import { SQLStatement } from '../sql.js';

const require = createRequire(import.meta.url);
export interface SQLite3Client extends AbstractDatabase<'sqlite3'> {
  filename: string;
}

interface SQLite3Module {
  Database: new (filename: string) => Database;
}

function sqlite3SQLStatement(statement: SQLStatement) {
  return {
    params: statement.values,
    sql: SQLStatement.format(statement, {
      formatValue: () => '?',

    }).replace(/UNIX_TIMESTAMP\(\)/, "strftime('%s','now')"),
  };
}
export const SQLite3 = {
  createDatabase(filename: string) {
    const { Database } = require('sqlite3') as SQLite3Module;
    return new Database(filename);
  },
  ...DatabaseDriver.Make(
    'sqlite3',
    async (sqlite3Client: SQLite3Client, sqlStatement: SQLStatement): Promise<unknown> => {
      const { params, sql } = sqlite3SQLStatement(sqlStatement);
      const database = SQLite3.createDatabase(sqlite3Client.filename);
      const queryResultPromise = new Promise((resolve, reject) => {
        database.all(sql, params, (error, result) => (error == null ? resolve(result) : reject(error)));
      });

      return queryResultPromise.finally(() => database.close());
    },
  ),
};

declare module '@w5s/database' {
  interface DatabaseDriverMap {
    sqlite3: SQLite3Client;
  }
}

DatabaseDriver.set('sqlite3', SQLite3);
