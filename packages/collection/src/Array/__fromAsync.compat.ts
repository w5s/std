export function __fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>>): Promise<Array<T>>;
export function __fromAsync<T, U>(
  iterableOrArrayLike: AsyncIterable<T> | Iterable<T>,
  mapFn: (value: Awaited<T>, index: number) => U,
): Promise<Array<Awaited<U>>>;
export async function __fromAsync(iterable: any, mapFn: any = (_: any) => _) {
  const returnValue: globalThis.Array<any> = [];
  let index = 0;

  if (Symbol.asyncIterator in iterable) {
    for await (const item of iterable) {
      returnValue.push(await mapFn(item, index++));
    }
  } else {
    for (const item of iterable) {
      returnValue.push(await mapFn(await item, index++));
    }
  }
  return returnValue;
}
