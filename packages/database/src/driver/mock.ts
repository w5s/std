import type { SQLStatement } from '../sql.js';
import type { AbstractDatabase } from '../client.js';
import { DatabaseDriver } from '../driver.js';

export interface MockClient extends AbstractDatabase<'mock'> {
  mockExecuteQuery?: (sqlStatement: SQLStatement) => Promise<unknown>;
}

export const Mock = DatabaseDriver.Make(
  'mock',
  async (client: MockClient, sqlStatement: SQLStatement): Promise<unknown> => {
    if (client.mockExecuteQuery != null) {
      return client.mockExecuteQuery(sqlStatement);
    }
    throw new Error('NotImplementedError');
  },
);

declare module '@w5s/database' {
  interface DatabaseDriverMap {
    mock: MockClient;
  }
}

DatabaseDriver.set('mock', Mock);
