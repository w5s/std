/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable unicorn/no-for-loop */
import { DataObject } from '@w5s/core';

const emptyStrings = Object.freeze(['']);
const emptyArray = Object.freeze([]);

type SQLBuffer = {
  strings: string[];
  values: unknown[];
};

const create = (): SQLBuffer => ({
  strings: [''],
  values: [],
});
const append = ({ strings: targetStrings, values: targetValues }: SQLBuffer, { strings, values }: SQLStatement) => {
  let stringsBufferIndex = targetStrings.length;
  let valuesBufferIndex = targetValues.length;
  if (strings.length > 0) {
    targetStrings[stringsBufferIndex - 1] += strings[0];
    for (let stringsIndex = 1; stringsIndex < strings.length; stringsIndex++) {
      targetStrings[stringsBufferIndex++] = strings[stringsIndex]!;
    }
  }
  for (let valuesIndex = 0; valuesIndex < values.length; valuesIndex++) {
    targetValues[valuesBufferIndex++] = values[valuesIndex]!;
  }
};

export interface SQLStatement
  extends DataObject<{
    [DataObject.type]: 'SQLStatement';
    strings: ReadonlyArray<string>;
    values: ReadonlyArray<SQLStatement.Value>;
  }> {}
export function SQLStatement({
  strings = emptyStrings,
  values = emptyArray,
}: {
  strings?: ReadonlyArray<string>;
  values?: ReadonlyArray<SQLStatement.Value>;
}): SQLStatement {
  return {
    _: SQLStatement.typeName,
    strings:
      strings.length <= values.length ? strings.concat(Array(values.length + 1 - strings.length).fill('')) : strings,
    values,
  };
}
export namespace SQLStatement {
  export type Value = unknown;

  export const { typeName, hasInstance } = DataObject.Make<SQLStatement>('SQLStatement');

  export function concat(...statements: SQLStatement[]): SQLStatement {
    const buffer = create();

    for (let statementIndex = 0; statementIndex < statements.length; statementIndex++) {
      append(buffer, statements[statementIndex]!);
    }

    return SQLStatement(buffer);
  }

  export function format(
    statement: SQLStatement,
    options: {
      formatString?: (str: string) => string;
      formatValue: (value: Value, index: number) => string;
    }
  ): string {
    const { strings, values } = statement;
    const { formatString = (_) => _, formatValue } = options;
    let returnValue = formatString(strings[0]!);
    for (let stringIndex = 1; stringIndex < strings.length; stringIndex++) {
      returnValue += `${formatValue(values[stringIndex - 1], stringIndex)}${formatString(strings[stringIndex]!)}`;
    }
    return returnValue;
  }
}

export function sql(strings: TemplateStringsArray, ...values: Array<string | SQLStatement>) {
  const buffer = create();
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
