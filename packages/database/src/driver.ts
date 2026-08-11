import type { DatabaseDriverMap } from '@w5s/database';
import type { TaskCanceler } from '@w5s/task';

import { useState } from '@w5s/application';

import type { SQLStatement } from './sql.js';

import { DatabaseError } from './error.js';
import { meta } from './meta.js';

const registry = useState<Readonly<Record<string, any>>>(meta, 'registry', {});

function notFound(name: string): never {
  throw new ReferenceError(`${name} driver not found`);
}

/**
 * @namespace
 */
export const DatabaseDriver = {
  get<Name extends keyof DatabaseDriverMap>(name: Name): DatabaseDriver.ModuleOf<Name> {
    // eslint-disable-next-line ts/no-unsafe-return
    return registry.current[name] ?? notFound(name);
  },
  Make<Name extends string, Client>(
    adapter: Name,
    execute: (client: Client, sqlStatement: SQLStatement, cancelerRef: TaskCanceler) => Promise<unknown>,
  ): DatabaseDriver.Module<Name, Client> {
    return {
      adapter,
      execute,
      // eslint-disable-next-line ts/require-await
      async handleError(cause: unknown) {
        return new DatabaseError({ cause });
      },
    };
  },
  set<Name extends keyof DatabaseDriverMap>(name: Name, module: DatabaseDriver.ModuleOf<Name>): void {
    registry.current = {
      ...registry.current,
      [name]: module,
    };
  },
};

export namespace DatabaseDriver {
  export interface Module<Name extends string, Client> {
    adapter: Name;

    execute(client: Client, sqlStatement: SQLStatement, cancelerRef: TaskCanceler): Promise<unknown>;

    handleError(cause: unknown): Promise<DatabaseError>;
  }

  export type ModuleOf<Name extends keyof DatabaseDriverMap> = Module<Name, ClientOf<Name>>;
  type ClientOf<Name extends keyof DatabaseDriverMap> = DatabaseDriverMap[Name];
}

export type Database = DatabaseDriverMap[keyof DatabaseDriverMap];
