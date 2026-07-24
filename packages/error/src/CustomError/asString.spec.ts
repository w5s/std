import { describe, expect, it } from 'vitest';

import { asString } from './asString.js';

describe(asString, () => {
  const CustomError = <P extends { cause?: unknown; message?: string; name?: string }>(properties: P) =>
    Object.assign(new Error(properties.message), properties);

  it.each([
    [CustomError({ name: 'CustomError' }), 'CustomError'],
    [CustomError({ message: 'CustomMessage', name: 'CustomError' }), 'CustomError: CustomMessage'],
    [
      CustomError({ cause: new Error('CauseMessage'), message: 'CustomMessage', name: 'CustomError' }),
      [
        // lines
        'CustomError: CustomMessage',
        '  └ Error: CauseMessage',
      ].join('\n'),
    ],
    [
      CustomError({
        cause: CustomError({
          cause: CustomError({
            message: 'Level 3',
            name: 'CustomError3',
          }),
          message: 'Level 2',
          name: 'CustomError2',
        }),
        message: 'Level 1',
        name: 'CustomError1',
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
