import { SQLStatement } from '../sql';
import { AbstractDatabaseClient } from '../client';
import { DatabaseDriver } from '../driver';

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

declare module '../driver' {
  interface DatabaseClientMap {
    mock: MockClient;
  }
}

DatabaseDriver.set('mock', Mock);
