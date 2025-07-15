import { describe, it, expect } from 'vitest';
import { provide } from './provide.js';
import { ContainerKey } from './ContainerKey.js';

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
