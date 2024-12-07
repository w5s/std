import { randomUUID } from '@w5s/uuid';
import { Task } from '@w5s/task';

function createUser(name: string) {
  return Task.map(randomUUID(), (uuid) => ({
    id: uuid,
    name,
  }));
}

export function main(): void {
  const userTask = createUser('John Doe');
  console.log(Task.unsafeRun(userTask)); // > Result.Ok({ id: 'XXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXX', name: 'John Doe' })
}
