import { globalStorage, useRef } from '@w5s/app';

export function main(): void {
  const counterRef = useRef('counter', 1);

  counterRef.current += 1;
  console.log(counterRef.current); // 2
  console.log(globalStorage.get('counter')); // 2
}
