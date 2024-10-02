export const _copySlice = <Item>(
  array: globalThis.Array<Item>,
  arrayStartIndex: number,
  source: ReadonlyArray<Item>,
  sourceFromIndex: number,
  sourceToIndex: number,
) => {
  let arrayIndex = arrayStartIndex;
  for (let sourceIndex = sourceFromIndex; sourceIndex < sourceToIndex; sourceIndex += 1) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    array[arrayIndex] = source[sourceIndex]!;
    arrayIndex += 1;
  }
};
