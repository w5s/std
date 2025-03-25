import { describe, it, expect } from 'vitest';
import { asString } from './asString.js';

describe(asString, () => {
  const CustomError = <P extends { name?: string; message?: string; cause?: unknown }>(properties: P) =>
    Object.assign(new Error(properties.message), properties);

  it.each([
    [CustomError({ name: 'CustomError' }), 'CustomError'],
    [CustomError({ name: 'CustomError', message: 'CustomMessage' }), 'CustomError: CustomMessage'],
    [
      CustomError({ name: 'CustomError', message: 'CustomMessage', cause: new Error('CauseMessage') }),
      [
        // lines
        'CustomError: CustomMessage',
        '  └ Error: CauseMessage',
      ].join('\n'),
    ],
    [
      CustomError({
        name: 'CustomError1',
        message: 'Level 1',
        cause: CustomError({
          name: 'CustomError2',
          message: 'Level 2',
          cause: CustomError({
            name: 'CustomError3',
            message: 'Level 3',
          }),
        }),
      }),
      [
        // lines
        'CustomError1: Level 1',
        '  └ CustomError2: Level 2',
        '  └ CustomError3: Level 3',
      ].join('\n'),
    ],
  ])('should return correctly formatted string representation', (error, expected) => {
    expect(asString(error)).toEqual(expected);
  });
});
