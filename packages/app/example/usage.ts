import { useRef } from '@w5s/app';

export function main() {
  const counterRef = useRef('counter', 1);
  counterRef.current += 1;
  console.log(counterRef.current); // 2
}
