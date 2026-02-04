/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { globalStorage, useStorage } from '@w5s/global-storage';

export const moduleStorage = useStorage({});

export function main(): void {
  const key = Symbol('someId');

  function nextId() {
    const id = globalStorage.get(key) ?? 0;
    globalStorage.set(key, id + 1);
    return id;
  }

  console.log(nextId()); // 0
  console.log(nextId()); // 1
  console.log(nextId()); // 2
}
