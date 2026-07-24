import { describe, expect, it } from 'vitest';

import { ContainerKey } from './ContainerKey.js';
import { provide } from './provide.js';

describe(provide, () => {
  it('should add property to object', () => {
    const provider = () => () => 'my_implementation';
    const SomeService = ContainerKey<'SomeService', () => string>('SomeService');
    const enhance = provide(SomeService, provider);
    expect(
      enhance({
        foo: true,
        [SomeService.containerKey]: () => () => 'default',
      }),
    ).toEqual({
      foo: true,
      [SomeService.containerKey]: provider,
    });
  });
});
