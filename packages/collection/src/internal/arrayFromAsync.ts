export const arrayFromAsync: typeof Array.fromAsync = Array.fromAsync ?? async function (iterable: any, mapFn: any = (_: any) => _) {
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
};
