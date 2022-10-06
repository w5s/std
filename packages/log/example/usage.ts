import { LogLevel } from '@w5s/log';

export function main(): void {
  console.log(LogLevel.Critical); // { levelName: 'Critical', level: 50 }
}
