import { type ConnectionConfig, createConnection } from 'mysql';

import type { AbstractDatabase } from '../client.js';

import { DatabaseDriver } from '../driver.js';
import { SQLStatement } from '../sql.js';

export interface MySQLClient extends AbstractDatabase<'mysql'>, ConnectionConfig {}

function mysqlSQLStatement(statement: SQLStatement) {
  return {
    params: statement.values,
    sql: SQLStatement.format(statement, {
      formatValue: () => '?',
    }),
  };
}

export const MySQL = {
  createConnection,
  ...DatabaseDriver.Make('mysql', async (mysqlClient: MySQLClient, sqlStatement: SQLStatement): Promise<unknown> => {
    const connection = MySQL.createConnection(mysqlClient);

    try {
      connection.connect();
      const queryResultPromise = new Promise((resolve, reject) => {
        const { params, sql } = mysqlSQLStatement(sqlStatement);
        connection.query(sql, params, (error, result) => (error == null ? resolve(result) : reject(error)));
      });

      const queryResult = await queryResultPromise;

      return queryResult;
    } finally {
      connection.end();
    }
  }),
};

declare module '@w5s/database' {
  interface DatabaseDriverMap {
    mysql: MySQLClient;
  }
}

DatabaseDriver.set('mysql', MySQL);
