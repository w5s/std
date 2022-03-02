import { sql, executeQuery, DatabaseClient } from '@w5s/database-client';
import { Task } from '@w5s/core';

interface User {
  id: number;
  name: string;
}

export function getUserById(client: DatabaseClient, id: User['id']) {
  const sqlStatement = sql`SELECT id, name FROM user WHERE id=${String(id)}`;
  const task = executeQuery(client, sqlStatement);

  return Task.map(task, (rows) => (Array.isArray(rows) ? (rows[0] as User) : undefined));
}

export async function main(): Promise<void> {
  const client: DatabaseClient = {
    databaseType: 'mysql',
    database: '',
    user: '',
  };

  const response = getUserById(client, 123);
  console.log(await Task.unsafeRun(response));
}
