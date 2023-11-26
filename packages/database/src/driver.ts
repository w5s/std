import type { Record, TaskCanceler } from '@w5s/core';
import type { DatabaseDriverMap } from '@w5s/database';
import { useRef } from '@w5s/application';
import type { SQLStatement } from './sql.js';
import { DatabaseError } from './error.js';
import { application } from './application.js';

export namespace DatabaseDriver {
  const registry = useRef<Record<string, any>>(application.state, 'registry', {});

  function notFound(name: string): never {
    throw new ReferenceError(`${name} driver not found`);
  }

  export function get<Name extends keyof DatabaseDriverMap>(name: Name): ModuleOf<Name> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return registry.current[name] ?? notFound(name);
  }

  export function set<Name extends keyof DatabaseDriverMap>(name: Name, module: ModuleOf<Name>): void {
    registry.current = {
      ...registry.current,
      [name]: module,
    };
  }

  export function Make<Name extends string, Client>(
    adapter: Name,
    execute: (client: Client, sqlStatement: SQLStatement, cancelerRef: TaskCanceler) => Promise<unknown>
  ): Module<Name, Client> {
    return {
      adapter,
      execute,
      async handleError(cause: unknown) {
        return DatabaseError({ cause });
      },
    };
  }

  export interface Module<Name extends string, Client> {
    adapter: Name;

    execute(client: Client, sqlStatement: SQLStatement, cancelerRef: TaskCanceler): Promise<unknown>;

    handleError(cause: unknown): Promise<DatabaseError>;
  }

  type ClientOf<Name extends keyof DatabaseDriverMap> = DatabaseDriverMap[Name];
  type ModuleOf<Name extends keyof DatabaseDriverMap> = Module<Name, ClientOf<Name>>;
}

export type Database = DatabaseDriverMap[keyof DatabaseDriverMap];
