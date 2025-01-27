import { sql, executeQuery, type Database } from '@w5s/database';
import { Task } from '@w5s/task';

interface User {
  id: number;
  name: string;
}

export function getUserById(client: Database, id: User['id']) {
  const sqlStatement = sql`SELECT id, name FROM user WHERE id=${String(id)}`;
  const task = executeQuery(client, sqlStatement);

  return Task.map(task, (rows) => (Array.isArray(rows) ? (rows[0] as User) : undefined));
}

export async function main(): Promise<void> {
  const client: Database = {
    databaseType: 'mysql',
    database: '',
    user: '',
  };

  const response = getUserById(client, 123);
  console.log(await Task.run(response));
}
