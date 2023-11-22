import { Env } from '@w5s/env';

export function main(): void {
  console.log(Env.get('BLAH'));
}
