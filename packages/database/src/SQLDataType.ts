type AnyObject = Record<string, unknown>;
type EmptyObject = {};
type DataType<T, P extends AnyObject = EmptyObject> = Readonly<
  {
    /**
     * Data type identifier : CHAR, BINARY, etc
     */
    dataType: T;
  } & P
>;

function create<T, P extends AnyObject = EmptyObject>(constructor: { dataType: T }, params: P): DataType<T, P> {
  return {
    dataType: constructor.dataType,

    ...params,
  };
}

export type SQLDataType =
  | SQLDataType.CHAR
  | SQLDataType.VARCHAR
  | SQLDataType.NCHAR
  | SQLDataType.NVARCHAR
  | SQLDataType.CLOB
  | SQLDataType.BOOLEAN
  | SQLDataType.BINARY
  | SQLDataType.VARBINARY
  | SQLDataType.BLOB
  | SQLDataType.INTEGER
  | SQLDataType.SMALLINT
  | SQLDataType.BIGINT
  | SQLDataType.DECIMAL
  | SQLDataType.NUMERIC
  | SQLDataType.FLOAT
  | SQLDataType.DOUBLE_PRECISION
  | SQLDataType.REAL
  | SQLDataType.DATE
  | SQLDataType.TIME
  | SQLDataType.TIMESTAMP
  | SQLDataType.INTERVAL;

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
  [BOOLEAN.dataType]: BOOLEAN,
  [BLOB.dataType]: BLOB,
  [CLOB.dataType]: CLOB,
  [INTEGER.dataType]: INTEGER,
  [SMALLINT.dataType]: SMALLINT,
  [BIGINT.dataType]: BIGINT,
  [REAL.dataType]: REAL,
  [DOUBLE_PRECISION.dataType]: DOUBLE_PRECISION,
  [DATE.dataType]: DATE,
  [TIME.dataType]: TIME,
  [TIMESTAMP.dataType]: TIMESTAMP,
  [INTERVAL.dataType]: INTERVAL,
  [CHAR.dataType]: CHAR,
  [VARCHAR.dataType]: VARCHAR,
  [NCHAR.dataType]: NCHAR,
  [NVARCHAR.dataType]: NVARCHAR,
  [FLOAT.dataType]: FLOAT,
  [DECIMAL.dataType]: DECIMAL,
  [NUMERIC.dataType]: NUMERIC,
  [BINARY.dataType]: BINARY,
  [VARBINARY.dataType]: VARBINARY,
};

function isEmpty(anyValue: readonly unknown[]): anyValue is never[] {
  return anyValue.length === 0;
}

/**
 * @example
 * ```typescript
 * SQLDataType.format(SQLDataType.BINARY(1)); 'BINARY(1)'
 * ```
 * @param data - the data to stringify
 */
function format(data: SQLDataType): string {
  const { keys } = Modules[data.dataType];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
  return `${data.dataType}${isEmpty(keys) ? '' : `(${keys.map((key) => (data as any)[key]).join(',')})`}`;
}

/**
 * @namespace
 */
export const SQLDataType = {
  CHAR,
  VARCHAR,
  NCHAR,
  NVARCHAR,
  CLOB,
  BOOLEAN,
  BINARY,
  VARBINARY,
  BLOB,
  INTEGER,
  SMALLINT,
  BIGINT,
  DECIMAL,
  NUMERIC,
  FLOAT,
  REAL,
  DOUBLE_PRECISION,
  DATE,
  TIME,
  TIMESTAMP,
  INTERVAL,
  format,
};
export namespace SQLDataType {
  /**
   * Character type
   */
  export interface CHAR extends DataType<typeof CHAR.dataType, { size: number }> {}

  /**
   * Varying character type
   */
  export interface VARCHAR extends DataType<typeof VARCHAR.dataType, { size: number }> {}

  /**
   * National Character type
   */
  export interface NCHAR extends DataType<typeof NCHAR.dataType, { size: number }> {}

  /**
   * National Character Varying type
   */
  export interface NVARCHAR extends DataType<typeof NVARCHAR.dataType, { size: number }> {}

  /**
   * Character Large Object type
   */
  export interface CLOB extends DataType<typeof CLOB.dataType> {}

  /**
   * Boolean type
   */
  export interface BOOLEAN extends DataType<typeof BOOLEAN.dataType> {}

  /**
   * Binary types
   */
  export interface BINARY extends DataType<typeof BINARY.dataType, { byteLength: number }> {}

  export interface VARBINARY extends DataType<typeof VARBINARY.dataType, { byteLength: number }> {}
  export interface BLOB extends DataType<typeof BLOB.dataType> {}

  //
  // Numeric types
  //

  export interface INTEGER extends DataType<typeof INTEGER.dataType> {}
  export interface SMALLINT extends DataType<typeof SMALLINT.dataType> {}
  export interface BIGINT extends DataType<typeof BIGINT.dataType> {}
  export interface DECIMAL extends DataType<typeof DECIMAL.dataType, { precision: number; scale: number }> {}
  export interface NUMERIC extends DataType<typeof NUMERIC.dataType, { precision: number; scale: number }> {}
  export interface FLOAT extends DataType<typeof FLOAT.dataType, { precision: number }> {}
  export interface REAL extends DataType<typeof REAL.dataType> {}
  export interface DOUBLE_PRECISION extends DataType<typeof DOUBLE_PRECISION.dataType> {}
  //
  // Temporal
  //
  export interface DATE extends DataType<typeof DATE.dataType> {}
  export interface TIME extends DataType<typeof TIME.dataType> {}
  export interface TIMESTAMP extends DataType<typeof TIMESTAMP.dataType> {}
  export interface INTERVAL extends DataType<typeof INTERVAL.dataType> {}
}
