import { Console } from '@w5s/console';
import { Task } from '@w5s/task';

export function main() {
  const task = Console.log('Hello, world!');
  return Task.run(task);
}
