import type { SQLStatement } from './sql.js';
import { DatabaseClientError } from './error.js';

export namespace DatabaseDriver {
  const driverMap: Record<string, any> = {};

  function getRegistry() {
    return driverMap;
  }

  function notFound(name: string): never {
    throw new ReferenceError(`${name} driver not found`);
  }

  export function get<Name extends keyof DatabaseClientMap>(name: Name): ModuleOf<Name> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return getRegistry()[name] ?? notFound(name);
  }

  export function set<Name extends keyof DatabaseClientMap>(name: Name, module: ModuleOf<Name>): void {
    getRegistry()[name] = module;
  }

  export function Make<Name extends string, Client>(
    adapter: Name,
    executeQuery: (client: Client, sqlStatement: SQLStatement) => Promise<unknown>
  ): Module<Name, Client> {
    return {
      adapter,
      executeQuery,
      async handleError(cause: unknown) {
        return DatabaseClientError({ cause });
      },
    };
  }

  export interface Module<Name extends string, Client> {
    adapter: Name;

    executeQuery(client: Client, sqlStatement: SQLStatement): Promise<unknown>;

    handleError(cause: unknown): Promise<DatabaseClientError>;
  }

  type ClientOf<Name extends keyof DatabaseClientMap> = DatabaseClientMap[Name];
  type ModuleOf<Name extends keyof DatabaseClientMap> = Module<Name, ClientOf<Name>>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DatabaseClientMap {}

export type DatabaseClient = DatabaseClientMap[keyof DatabaseClientMap];
