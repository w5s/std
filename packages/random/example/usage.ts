import { randomNumber } from '@w5s/random';
import { Task } from '@w5s/task';

export function main(): void {
  const userTask = createUser('John Doe');
  console.log(Task.run(userTask)); // > Result.Ok({ id: 'XXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXX', name: 'John Doe' })
}

function createUser(name: string) {
  return Task.map(randomNumber(1, 3), (id) => ({
    id,
    name,
  }));
}
