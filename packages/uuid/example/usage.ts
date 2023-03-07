import { randomUUID } from '@w5s/uuid';
import { Task, unsafeRun } from '@w5s/core';

function createUser(name: string) {
  return Task.map(randomUUID, (uuid) => ({
    id: uuid,
    name,
  }));
}

export function main(): void {
  const userTask = createUser('John Doe');
  console.log(unsafeRun(userTask)); // > Result.Ok({ id: 'XXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXX', name: 'John Doe' })
}
