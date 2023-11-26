import { useStorage, useRef } from '@w5s/application';

export function main(): void {
  const globalStorage = useStorage(globalThis);
  const counterRef = useRef(globalStorage, 'counter', 1);

  counterRef.current += 1;
  console.log(counterRef.current); // 2
  console.log(globalStorage.get('counter')); // 2
}
