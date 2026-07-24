import { Task } from '@w5s/task';
import { randomUUID } from '@w5s/uuid';

export function main(): void {
  const userTask = createUser('John Doe');
  console.log(Task.run(userTask)); // > Result.Ok({ id: 'XXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXX', name: 'John Doe' })
}

function createUser(name: string) {
  return Task.map(randomUUID(), (uuid) => ({
    id: uuid,
    name,
  }));
}
