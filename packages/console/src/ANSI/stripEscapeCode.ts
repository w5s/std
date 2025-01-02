// https://github.com/chalk/ansi-regex/blob/02fa893d619d3da85411acc8fd4e2eea0e95a9d9/index.js
const ansiRegex = new RegExp(
  [
    String.raw`[\u001B\u009B][[\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\d\/#&.:=?%@~_]+)*|[a-zA-Z\d]+(?:;[-a-zA-Z\d\/#&.:=?%@~_]*)*)?\u0007)`,
    String.raw`(?:(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PR-TXZcf-nq-uy=><~]))`,
  ].join('|'),
  'g',
);

/**
 * Strip ANSI escape codes from the string.
 *
 * @example Usage
 * ```typescript
 * stripEscapeCode(red("Hello, world!"));// == "Hello, world!"
 * ```
 * @param expression - The text to remove ANSI escape codes from
 */
export function stripEscapeCode(expression: string): string {
  return expression.replaceAll(ansiRegex, '');
}
