import { createConnection, ConnectionConfig } from 'mysql';
import { SQLStatement } from '../sql.js';
import type { AbstractDatabase } from '../client.js';
import { DatabaseDriver } from '../driver.js';

function mysqlSQLStatement(statement: SQLStatement) {
  return {
    sql: SQLStatement.format(statement, {
      formatValue: () => '?',
    }),
    params: statement.values,
  };
}

export interface MySQLClient extends AbstractDatabase<'mysql'>, ConnectionConfig {}

export const MySQL = {
  createConnection,
  ...DatabaseDriver.Make('mysql', async (mysqlClient: MySQLClient, sqlStatement: SQLStatement): Promise<unknown> => {
    const connection = MySQL.createConnection(mysqlClient);

    try {
      connection.connect();
      const queryResultPromise = new Promise((resolve, reject) => {
        const { sql, params } = mysqlSQLStatement(sqlStatement);
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
