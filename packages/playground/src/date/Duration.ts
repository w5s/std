import type { Codec, Int, Option } from '@w5s/core';
import { Struct } from '@w5s/core/dist/Struct.js';
import { Symbol } from '@w5s/core/dist/Symbol.js';
import { parse as parseInt } from '@w5s/core/dist/Int/parse.js';
import { parse as parseNumber } from '@w5s/core/dist/Number/parse.js';
import { Callable } from '@w5s/core/dist/Callable.js';

const numbers = String.raw`\d+`;
const fractionalNumbers = `${numbers}(?:[\\.,]${numbers})?`;
const date = `(${numbers}Y)?(${numbers}M)?(${numbers}W)?(${numbers}D)?`;
const time = `T(${fractionalNumbers}H)?(${fractionalNumbers}M)?(${fractionalNumbers}S)?`;
const durationISO8601 = `P(?:${date}(?:${time})?)`;

export const durationRegexp = new RegExp(durationISO8601);

function parse(expression: string): Option<Duration> {
  const matches = expression.replaceAll(',', '.').match(durationRegexp);
  if (matches == null) {
    return undefined;
  }
  // Slice away first entry in match-array (the input string)
  const slicedMatches: Array<string | undefined> = matches.slice(1);
  if (slicedMatches.every((v) => v == null)) {
    return undefined;
  }
  const [
    yearsParsed = '0',
    monthsParsed = '0',
    weeksParsed = '0',
    daysParsed = '0',
    hoursParsed = '0',
    minutesParsed = '0',
    secondsParsed = '0',
  ] = slicedMatches;
  const years = parseInt(yearsParsed);
  const months = parseInt(monthsParsed);
  const weeks = parseInt(weeksParsed);
  const days = parseInt(daysParsed);
  const hours = parseInt(hoursParsed);
  const minutes = parseInt(minutesParsed);
  const seconds = parseNumber(secondsParsed);

  if (
    years === undefined ||
    months === undefined ||
    weeks === undefined ||
    days === undefined ||
    hours === undefined ||
    minutes === undefined ||
    seconds === undefined
  ) {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return DurationStruct.create({
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds,
  });
}

const formatPart = (prefix: string, part: number) => (part === 0 ? '' : `${part}${prefix}`);
const formatSection = (prefix: string, content: string) => (content.length === 0 ? '' : `${prefix}${content}`);

function format(duration: Duration): string {
  return `P${formatPart('Y', duration.years)}${formatPart('M', duration.months)}${formatPart('D', duration.days)}${formatSection(
    'T',
    `${formatPart('H', duration.hours)}${formatPart('M', duration.minutes)}${formatPart('S', duration.seconds)}`,
  )}`;
}

export interface Duration
  extends Struct<{
    _: 'Duration';
    years: Int;
    months: Int;
    weeks: Int;
    days: Int;
    hours: Int;
    minutes: Int;
    seconds: number;
  }> {}

const DurationStruct = Struct.define<Duration>({ typeName: 'Duration' });

const DurationCodec: Codec<Duration> = {
  [Symbol.encode]: (value) => format(value),
  [Symbol.decode]: (input, { ok, error }) => {
    const returnValue = typeof input === 'string' ? parse(input) : undefined;
    return returnValue === undefined ? error(input, 'Duration') : ok(returnValue);
  },
  [Symbol.schema]: () => ({
    type: 'string',
    format: 'duration',
  }),
};

/**
 * @namespace
 */
export const Duration = Callable({
  ...DurationStruct,
  ...DurationCodec,
  [Callable.symbol]: (properties?: Partial<Struct.Parameters<Duration>>): Duration =>
    Duration.create({
      years: properties?.years ?? (0 as Int),
      months: properties?.months ?? (0 as Int),
      weeks: properties?.weeks ?? (0 as Int),
      days: properties?.days ?? (0 as Int),
      hours: properties?.hours ?? (0 as Int),
      minutes: properties?.minutes ?? (0 as Int),
      seconds: properties?.seconds ?? 0,
    }),
});
