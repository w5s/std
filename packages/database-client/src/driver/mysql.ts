import { createConnection, ConnectionConfig } from 'mysql';
import { SQLStatement } from '../sql.js';
import type { AbstractDatabaseClient } from '../client.js';
import { DatabaseDriver } from '../driver.js';

function mysqlSQLStatement(statement: SQLStatement) {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {
    sql: SQLStatement.format(statement, {
      formatValue: () => '?',
    }),
    params: statement.values,
  };
}

export interface MySQLClient extends AbstractDatabaseClient<'mysql'>, ConnectionConfig {}

export const MySQL = {
  createConnection,
  ...DatabaseDriver.Make('mysql', async (mysqlClient: MySQLClient, sqlStatement: SQLStatement): Promise<unknown> => {
    const connection = MySQL.createConnection(mysqlClient);

    try {
      connection.connect();
      const queryResultPromise = new Promise((resolve, reject) => {
        const { sql, params } = mysqlSQLStatement(sqlStatement);
        connection.query(sql, params, (error, result) => (error != null ? reject(error) : resolve(result)));
      });

      const queryResult = await queryResultPromise;

      return queryResult;
    } finally {
      connection.end();
    }
  }),
};

declare module '../driver.js' {
  interface DatabaseClientMap {
    mysql: MySQLClient;
  }
}

DatabaseDriver.set('mysql', MySQL);
