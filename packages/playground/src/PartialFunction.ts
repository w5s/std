/* eslint-disable ts/unified-signatures */
export interface PartialFunctionLike<F extends PartialApplyFunction> {
  readonly apply: F;
  readonly isDefinedAt: (anyValue: unknown) => anyValue is PartialParameter<F>;
}

export type PartialParameter<F extends PartialApplyFunction> = Parameters<F>[0];

type PartialApplyFunction<P = any, R = any> = (value: P) => R;

export class PartialFunction<F extends PartialApplyFunction> implements PartialFunctionLike<F> {
  readonly apply: F;
  readonly isDefinedAt: (anyValue: unknown) => anyValue is PartialParameter<F>;

  constructor(properties: PartialFunctionLike<F>) {
    this.isDefinedAt = properties.isDefinedAt;
    this.apply = properties.apply;
  }

  andThen<FThen extends PartialApplyFunction<PartialParameter<F>>>(
    thenFn: FThen,
  ): PartialFunction<(parameter: PartialParameter<F>) => ReturnType<FThen>>;
  andThen<FThen extends PartialApplyFunction<PartialParameter<F>>>(
    thenFn: PartialFunctionLike<FThen>,
  ): PartialFunction<(parameter: PartialParameter<F>) => ReturnType<FThen>>;
  andThen<FThen extends PartialApplyFunction<PartialParameter<F>>>(
    thenFn: FThen | PartialFunctionLike<FThen>,
  ): PartialFunction<(parameter: PartialParameter<F>) => ReturnType<FThen>> {
    // @ts-ignore Typing is hard here
    return andThen(this, thenFn);
  }

  orElse<FElse extends PartialApplyFunction>(elseFn: PartialFunctionLike<FElse>): PartialFunction<F & FElse> {
    return orElse(this, elseFn);
  }
}

export function andThen<F extends PartialApplyFunction, FThen extends PartialApplyFunction<PartialParameter<F>>>(
  self: PartialFunctionLike<F>,
  thenFn: FThen,
): PartialFunction<(parameter: PartialParameter<F>) => ReturnType<FThen>>;
export function andThen<F extends PartialApplyFunction, FThen extends PartialApplyFunction<PartialParameter<F>>>(
  self: PartialFunctionLike<F>,
  thenFn: PartialFunctionLike<FThen>,
): PartialFunction<(parameter: PartialParameter<F>) => ReturnType<FThen>>;
export function andThen<F extends PartialApplyFunction, FThen extends PartialApplyFunction<PartialParameter<F>>>(
  self: PartialFunctionLike<F>,
  thenFn: FThen | PartialFunctionLike<FThen>,
): PartialFunction<(parameter: PartialParameter<F>) => ReturnType<FThen>> {
  const { apply, isDefinedAt } = self;
  const thenApply = typeof thenFn === 'function' ? thenFn : thenFn.apply;
  return partial({
    apply: (value: PartialParameter<F>) => thenApply(apply(value)),

    isDefinedAt,
  });
}

export function orElse<F extends PartialApplyFunction, FElse extends PartialApplyFunction>(
  self: PartialFunctionLike<F>,
  elseFn: PartialFunctionLike<FElse>,
): PartialFunction<F & FElse> {
  return partial({
    // @ts-ignore Typing is hard here
    apply: (value) => (self.isDefinedAt(value) ? self.apply(value) : elseFn.apply(value)),
    isDefinedAt: (value) => self.isDefinedAt(value) || elseFn.isDefinedAt(value),
  });
}

export function partial<F extends PartialApplyFunction>(properties: PartialFunctionLike<F>): PartialFunction<F> {
  return new PartialFunction(properties);
}

export const handleBoolean = partial({
  apply: (_value: boolean) => 'bool' as const,
  isDefinedAt: (value) => typeof value === 'boolean',
});

export const handleNumber = partial({
  apply: (_value: number) => 'bool' as const,
  isDefinedAt: (value) => typeof value === 'number',
});

export const handleBooleanOrNumber = handleBoolean
  //
  .orElse({
    apply: (_value: number) => 'bool' as const,
    isDefinedAt: (value) => typeof value === 'number',
  })
  .orElse({
    apply: (_value: string) => 'str' as const,
    isDefinedAt: (value) => typeof value === 'string',
  });

export const isEven = partial({
  apply: (value: number) => value % 2 === 0,
  isDefinedAt: (value) => typeof value === 'number',
});
export const processEven = isEven.andThen((_value: number) => 'bool' as const);
