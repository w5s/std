import { objectId } from '@w5s/object-id';

export function main(): void {
  const someObject = { foo: 1 };
  const id = objectId(someObject); // typeof id === 'number'
  console.log(id === objectId(someObject)); // true (because idempotent)
}
