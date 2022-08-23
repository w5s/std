import { SQLStatement } from '../sql.js';
import { AbstractDatabaseClient } from '../client.js';
import { DatabaseDriver } from '../driver.js';

export interface MockClient extends AbstractDatabaseClient<'mock'> {
  mockExecuteQuery?: (sqlStatement: SQLStatement) => Promise<unknown>;
}

export const Mock = DatabaseDriver.Make(
  'mock',
  async (client: MockClient, sqlStatement: SQLStatement): Promise<unknown> => {
    if (client.mockExecuteQuery != null) {
      return client.mockExecuteQuery(sqlStatement);
    }
    throw new Error('NotImplementedError');
  }
);

declare module '@w5s/database-client' {
  interface DatabaseDriverMap {
    mock: MockClient;
  }
}

DatabaseDriver.set('mock', Mock);
