import { Config } from '@w5s/config';
import { Task } from '@w5s/task';

export async function main(): Promise<void> {
  const explorer = Config('my-app');
  const result = await Task.run(explorer.search());

  if (result.ok && result.value != null) {
    console.log(result.value.config);
  }
}
