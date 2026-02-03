type PartialApplyFunction<P = any, R = any> = (value: P) => R;

export type PartialParameter<F extends PartialApplyFunction> = Parameters<F>[0];

export interface PartialFunctionLike<F extends PartialApplyFunction> {
  readonly isDefinedAt: (anyValue: unknown) => anyValue is PartialParameter<F>;
  readonly apply: F;
}

export class PartialFunction<F extends PartialApplyFunction> implements PartialFunctionLike<F> {
  readonly isDefinedAt: (anyValue: unknown) => anyValue is PartialParameter<F>;
  readonly apply: F;

  constructor(properties: PartialFunctionLike<F>) {
    this.isDefinedAt = properties.isDefinedAt;
    this.apply = properties.apply;
  }

  orElse<FElse extends PartialApplyFunction>(elseFn: PartialFunctionLike<FElse>): PartialFunction<F & FElse> {
    return orElse(this, elseFn);
  }

  andThen<FThen extends PartialApplyFunction<PartialParameter<F>>>(
    thenFn: FThen,
  ): PartialFunction<(parameter: PartialParameter<F>) => ReturnType<FThen>>;
  andThen<FThen extends PartialApplyFunction<PartialParameter<F>>>(
    thenFn: PartialFunctionLike<FThen>,
  ): PartialFunction<(parameter: PartialParameter<F>) => ReturnType<FThen>>;
  andThen<FThen extends PartialApplyFunction<PartialParameter<F>>>(
    thenFn: PartialFunctionLike<FThen> | FThen,
  ): PartialFunction<(parameter: PartialParameter<F>) => ReturnType<FThen>> {
    // @ts-ignore Typing is hard here
    return andThen(this, thenFn);
  }
}

export function partial<F extends PartialApplyFunction>(properties: PartialFunctionLike<F>): PartialFunction<F> {
  return new PartialFunction(properties);
}

export function orElse<F extends PartialApplyFunction, FElse extends PartialApplyFunction>(
  self: PartialFunctionLike<F>,
  elseFn: PartialFunctionLike<FElse>,
): PartialFunction<F & FElse> {
  return partial({
    isDefinedAt: (value) => self.isDefinedAt(value) || elseFn.isDefinedAt(value),
    // @ts-ignore Typing is hard here
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    apply: (value) => (self.isDefinedAt(value) ? self.apply(value) : elseFn.apply(value)),
  });
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
  thenFn: PartialFunctionLike<FThen> | FThen,
): PartialFunction<(parameter: PartialParameter<F>) => ReturnType<FThen>> {
  const { isDefinedAt, apply } = self;
  const thenApply = typeof thenFn === 'function' ? thenFn : thenFn.apply;
  return partial({
    isDefinedAt,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument
    apply: (value: PartialParameter<F>) => thenApply(apply(value)),
  });
}

export const handleBoolean = partial({
  isDefinedAt: (value) => typeof value === 'boolean',
  apply: (_value: boolean) => 'bool' as const,
});

export const handleNumber = partial({
  isDefinedAt: (value) => typeof value === 'number',
  apply: (_value: number) => 'bool' as const,
});

export const handleBooleanOrNumber = handleBoolean
  //
  .orElse({
    isDefinedAt: (value) => typeof value === 'number',
    apply: (_value: number) => 'bool' as const,
  })
  .orElse({
    isDefinedAt: (value) => typeof value === 'string',
    apply: (_value: string) => 'str' as const,
  });

export const isEven = partial({
  isDefinedAt: (value) => typeof value === 'number',
  apply: (value: number) => value % 2 === 0,
});
export const processEven = isEven.andThen((_value: number) => 'bool' as const);
