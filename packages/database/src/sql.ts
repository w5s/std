/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable unicorn/no-for-loop */
import { Callable } from '@w5s/core/dist/Callable.js';
import { Struct } from '@w5s/core/dist/Struct.js';

const emptyStrings = Object.freeze(['']);
const emptyArray = Object.freeze([]);

type SQLBuffer = {
  strings: string[];
  values: unknown[];
};

const SQLBuffer = (): SQLBuffer => ({
  strings: [''],
  values: [],
});
const append = ({ strings: targetStrings, values: targetValues }: SQLBuffer, { strings, values }: SQLStatement) => {
  let stringsBufferIndex = targetStrings.length;
  let valuesBufferIndex = targetValues.length;
  if (strings.length > 0) {
    targetStrings[stringsBufferIndex - 1] += strings[0]!;
    for (let stringsIndex = 1; stringsIndex < strings.length; stringsIndex++) {
      targetStrings[stringsBufferIndex++] = strings[stringsIndex]!;
    }
  }
  for (let valuesIndex = 0; valuesIndex < values.length; valuesIndex++) {
    targetValues[valuesBufferIndex++] = values[valuesIndex]!;
  }
};

const SQLStatementType = Struct.define<SQLStatement>('SQLStatement');

function call({
  strings = emptyStrings,
  values = emptyArray,
}: {
  strings?: ReadonlyArray<string>;
  values?: ReadonlyArray<SQLStatement.Value>;
}): SQLStatement {
  return SQLStatementType.create({
    strings:
      strings.length <= values.length ? strings.concat(Array(values.length + 1 - strings.length).fill('')) : strings,
    values,
  });
}

function concat(...statements: SQLStatement[]): SQLStatement {
  const buffer = SQLBuffer();

  for (let statementIndex = 0; statementIndex < statements.length; statementIndex++) {
    append(buffer, statements[statementIndex]!);
  }

  return SQLStatementType(buffer);
}

function format(
  statement: SQLStatement,
  options: {
    formatString?: (str: string) => string;
    formatValue: (value: SQLStatement.Value, index: number) => string;
  },
): string {
  const { strings, values } = statement;
  const { formatString = (_) => _, formatValue } = options;
  let returnValue = formatString(strings[0]!);
  for (let stringIndex = 1; stringIndex < strings.length; stringIndex++) {
    returnValue += `${formatValue(values[stringIndex - 1], stringIndex)}${formatString(strings[stringIndex]!)}`;
  }
  return returnValue;
}

export interface SQLStatement
  extends Struct<{
    [Struct.type]: 'SQLStatement';
    strings: ReadonlyArray<string>;
    values: ReadonlyArray<SQLStatement.Value>;
  }> {}

/**
 * @namespace
 */
export const SQLStatement = Callable({
  ...SQLStatementType,
  [Callable.symbol]: call,
  concat,
  format,
});

export namespace SQLStatement {
  export type Value = unknown;
}

export function sql(strings: TemplateStringsArray, ...values: Array<string | SQLStatement>) {
  const buffer = SQLBuffer();
  buffer.strings[0] = strings[0]!;
  for (let stringIndex = 1; stringIndex < strings.length; stringIndex++) {
    const value = values[stringIndex - 1]!;
    if (typeof value === 'string') {
      buffer.strings.push(strings[stringIndex]!);
      buffer.values.push(value);
    } else {
      append(buffer, value);
      buffer.strings[buffer.strings.length - 1] += strings[stringIndex]!;
    }
  }
  return SQLStatement(buffer);
}
export namespace sql {
  export function raw(value: string) {
    return SQLStatement({ strings: [value] });
  }
}
