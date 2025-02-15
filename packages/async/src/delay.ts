/**
 * Resolves a promise after waiting `milliseconds`
 *
 * @example
 * ```typescript
 * await delay(5);
 * ```
 *
 * @param milliseconds - the delay to wait in milliseconds
 */
export async function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), milliseconds);
  });
}
