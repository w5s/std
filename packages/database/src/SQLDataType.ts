export type SQLDataType =
  | SQLDataType.BIGINT
  | SQLDataType.BINARY
  | SQLDataType.BLOB
  | SQLDataType.BOOLEAN
  | SQLDataType.CHAR
  | SQLDataType.CLOB
  | SQLDataType.DATE
  | SQLDataType.DECIMAL
  | SQLDataType.DOUBLE_PRECISION
  | SQLDataType.FLOAT
  | SQLDataType.INTEGER
  | SQLDataType.INTERVAL
  | SQLDataType.NCHAR
  | SQLDataType.NUMERIC
  | SQLDataType.NVARCHAR
  | SQLDataType.REAL
  | SQLDataType.SMALLINT
  | SQLDataType.TIME
  | SQLDataType.TIMESTAMP
  | SQLDataType.VARBINARY
  | SQLDataType.VARCHAR;
type AnyObject = Record<string, unknown>;
type DataType<T, P extends AnyObject = EmptyObject> = Readonly<
  P & {
    /**
     * Data type identifier : CHAR, BINARY, etc
     */
    dataType: T;
  }
>;
// eslint-disable-next-line ts/consistent-type-definitions
type EmptyObject = {};

function create<T, P extends AnyObject = EmptyObject>(constructor: { dataType: T }, params: P): DataType<T, P> {
  return {
    dataType: constructor.dataType,

    ...params,
  };
}

const CHAR = Object.assign((size: number) => create(CHAR, { size }), {
  dataType: 'CHAR',
  keys: ['size'],
} as const);

const VARCHAR = Object.assign((size: number) => create(VARCHAR, { size }), {
  dataType: 'VARCHAR',
  keys: ['size'],
} as const);

const NCHAR = Object.assign((size: number) => create(NCHAR, { size }), {
  dataType: 'NCHAR',
  keys: ['size'],
} as const);

const NVARCHAR = Object.assign((size: number) => create(NVARCHAR, { size }), {
  dataType: 'NVARCHAR',
  keys: ['size'],
} as const);

const CLOB = {
  dataType: 'CLOB',
  keys: [],
} as const;

const BOOLEAN = {
  dataType: 'BOOLEAN',
  keys: [],
} as const;

const BINARY = Object.assign((byteLength: number) => create(BINARY, { byteLength }), {
  dataType: 'BINARY',
  keys: ['byteLength'],
} as const);

const VARBINARY = Object.assign((byteLength: number) => create(VARBINARY, { byteLength }), {
  dataType: 'VARBINARY',
  keys: ['byteLength'],
} as const);

const BLOB = {
  dataType: 'BLOB',
  keys: [],
} as const;

const INTEGER = {
  dataType: 'INTEGER',
  keys: [],
} as const;

const SMALLINT = {
  dataType: 'SMALLINT',
  keys: [],
} as const;

const BIGINT = {
  dataType: 'BIGINT',
  keys: [],
} as const;

const DECIMAL = Object.assign((precision: number, scale: number) => create(DECIMAL, { precision, scale }), {
  dataType: 'DECIMAL',
  keys: ['precision', 'scale'],
} as const);

const NUMERIC = Object.assign((precision: number, scale: number) => create(NUMERIC, { precision, scale }), {
  dataType: 'NUMERIC',
  keys: ['precision', 'scale'],
} as const);

const FLOAT = Object.assign((precision: number) => create(FLOAT, { precision }), {
  dataType: 'FLOAT',
  keys: ['precision'],
} as const);

const REAL = {
  dataType: 'REAL',
  keys: [],
} as const;

const DOUBLE_PRECISION = {
  dataType: 'DOUBLE PRECISION',
  keys: [],
} as const;

const DATE = {
  dataType: 'DATE',
  keys: [],
} as const;

const TIME = {
  dataType: 'TIME',
  keys: [],
} as const;

const TIMESTAMP = {
  dataType: 'TIMESTAMP',
  keys: [],
} as const;

const INTERVAL = {
  dataType: 'INTERVAL',
  keys: [],
} as const;

const Modules = {
  [BIGINT.dataType]: BIGINT,
  [BINARY.dataType]: BINARY,
  [BLOB.dataType]: BLOB,
  [BOOLEAN.dataType]: BOOLEAN,
  [CHAR.dataType]: CHAR,
  [CLOB.dataType]: CLOB,
  [DATE.dataType]: DATE,
  [DECIMAL.dataType]: DECIMAL,
  [DOUBLE_PRECISION.dataType]: DOUBLE_PRECISION,
  [FLOAT.dataType]: FLOAT,
  [INTEGER.dataType]: INTEGER,
  [INTERVAL.dataType]: INTERVAL,
  [NCHAR.dataType]: NCHAR,
  [NUMERIC.dataType]: NUMERIC,
  [NVARCHAR.dataType]: NVARCHAR,
  [REAL.dataType]: REAL,
  [SMALLINT.dataType]: SMALLINT,
  [TIME.dataType]: TIME,
  [TIMESTAMP.dataType]: TIMESTAMP,
  [VARBINARY.dataType]: VARBINARY,
  [VARCHAR.dataType]: VARCHAR,
};

/**
 * @example
 * ```typescript
 * SQLDataType.format(SQLDataType.BINARY(1)); 'BINARY(1)'
 * ```
 * @param data the data to stringify
 */
function format(data: SQLDataType): string {
  const { keys } = Modules[data.dataType];

  // eslint-disable-next-line ts/no-unsafe-return, ts/no-unsafe-member-access
  return `${data.dataType}${isEmpty(keys) ? '' : `(${keys.map((key) => (data as any)[key]).join(',')})`}`;
}

function isEmpty(anyValue: ReadonlyArray<unknown>): anyValue is Array<never> {
  return anyValue.length === 0;
}

/**
 * @namespace
 */
export const SQLDataType = {
  BIGINT,
  BINARY,
  BLOB,
  BOOLEAN,
  CHAR,
  CLOB,
  DATE,
  DECIMAL,
  DOUBLE_PRECISION,
  FLOAT,
  format,
  INTEGER,
  INTERVAL,
  NCHAR,
  NUMERIC,
  NVARCHAR,
  REAL,
  SMALLINT,
  TIME,
  TIMESTAMP,
  VARBINARY,
  VARCHAR,
};
export namespace SQLDataType {
  export interface BIGINT extends DataType<typeof BIGINT.dataType> {}

  /**
   * Binary types
   */
  export interface BINARY extends DataType<typeof BINARY.dataType, { byteLength: number }> {}

  export interface BLOB extends DataType<typeof BLOB.dataType> {}

  /**
   * Boolean type
   */
  export interface BOOLEAN extends DataType<typeof BOOLEAN.dataType> {}

  /**
   * Character type
   */
  export interface CHAR extends DataType<typeof CHAR.dataType, { size: number }> {}

  /**
   * Character Large Object type
   */
  export interface CLOB extends DataType<typeof CLOB.dataType> {}

  //
  // Temporal
  //
  export interface DATE extends DataType<typeof DATE.dataType> {}

  export interface DECIMAL extends DataType<typeof DECIMAL.dataType, { precision: number; scale: number }> {}
  export interface DOUBLE_PRECISION extends DataType<typeof DOUBLE_PRECISION.dataType> {}

  //
  // Numeric types
  //

  export interface FLOAT extends DataType<typeof FLOAT.dataType, { precision: number }> {}
  export interface INTEGER extends DataType<typeof INTEGER.dataType> {}
  export interface INTERVAL extends DataType<typeof INTERVAL.dataType> {}

  /**
   * National Character type
   */
  export interface NCHAR extends DataType<typeof NCHAR.dataType, { size: number }> {}
  export interface NUMERIC extends DataType<typeof NUMERIC.dataType, { precision: number; scale: number }> {}

  /**
   * National Character Varying type
   */
  export interface NVARCHAR extends DataType<typeof NVARCHAR.dataType, { size: number }> {}
  export interface REAL extends DataType<typeof REAL.dataType> {}
  export interface SMALLINT extends DataType<typeof SMALLINT.dataType> {}
  export interface TIME extends DataType<typeof TIME.dataType> {}
  export interface TIMESTAMP extends DataType<typeof TIMESTAMP.dataType> {}
  export interface VARBINARY extends DataType<typeof VARBINARY.dataType, { byteLength: number }> {}

  /**
   * Varying character type
   */
  export interface VARCHAR extends DataType<typeof VARCHAR.dataType, { size: number }> {}
}
