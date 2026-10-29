import { globalStorage, useShadowStorage } from '@w5s/shadow-storage';

export const moduleStorage = useShadowStorage({});

export function main(): void {
  const key = Symbol('someId');

  function nextId() {
    const id = (globalStorage.get(key) as number) ?? 0;
    globalStorage.set(key, id + 1);
    return id;
  }

  console.log(nextId()); // 0
  console.log(nextId()); // 1
  console.log(nextId()); // 2
}
