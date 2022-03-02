/* eslint-disable @typescript-eslint/naming-convention */
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
export namespace SQLDataType {
  type AnyObject = Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/ban-types
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...params,
    };
  }

  //
  // String type
  //
  export interface CHAR extends DataType<typeof CHAR.dataType, { size: number }> {}

  export function CHAR(size: number): CHAR {
    return create(CHAR, { size });
  }
  export namespace CHAR {
    export const dataType = 'CHAR';
    export const keys = ['size'];
  }

  /**
   * Varying character type
   */
  export interface VARCHAR extends DataType<typeof VARCHAR.dataType, { size: number }> {}
  export function VARCHAR(size: number): VARCHAR {
    return create(VARCHAR, { size });
  }
  export namespace VARCHAR {
    export const dataType = 'VARCHAR';
    export const keys = ['size'];
  }

  /**
   * National Character type
   */
  export interface NCHAR extends DataType<typeof NCHAR.dataType, { size: number }> {}
  export function NCHAR(size: number): NCHAR {
    return create(NCHAR, { size });
  }
  export namespace NCHAR {
    export const dataType = 'NCHAR';
    export const keys = ['size'];
  }

  /**
   * National Character Varying type
   */
  export interface NVARCHAR extends DataType<typeof NVARCHAR.dataType, { size: number }> {}
  export function NVARCHAR(size: number): NVARCHAR {
    return create(NVARCHAR, { size });
  }
  export namespace NVARCHAR {
    export const dataType = 'NVARCHAR';
    export const keys = ['size'];
  }

  /**
   * Character Large Object type
   */
  export interface CLOB extends DataType<typeof CLOB.dataType> {}
  export namespace CLOB {
    export const dataType = 'CLOB';
    export const keys = [];
  }

  //
  // Boolean type
  //
  export interface BOOLEAN extends DataType<typeof BOOLEAN.dataType> {}
  export namespace BOOLEAN {
    export const dataType = 'BOOLEAN';
    export const keys = [];
  }

  //
  // Binary types
  //
  export interface BINARY extends DataType<typeof BINARY.dataType, { byteLength: number }> {}
  export function BINARY(byteLength: number): BINARY {
    return create(BINARY, { byteLength });
  }
  export namespace BINARY {
    export const dataType = 'BINARY';
    export const keys = ['byteLength'];
  }

  export interface VARBINARY extends DataType<typeof VARBINARY.dataType, { byteLength: number }> {}
  export function VARBINARY(byteLength: number): VARBINARY {
    return create(VARBINARY, { byteLength });
  }
  export namespace VARBINARY {
    export const dataType = 'VARBINARY';
    export const keys = ['byteLength'];
  }

  export interface BLOB extends DataType<typeof BLOB.dataType> {}
  export namespace BLOB {
    export const dataType = 'BLOB';
    export const keys = [];
  }

  //
  // Numeric types
  //

  export interface INTEGER extends DataType<typeof INTEGER.dataType> {}
  export namespace INTEGER {
    export const dataType = 'INTEGER';
    export const keys = [];
  }

  export interface SMALLINT extends DataType<typeof SMALLINT.dataType> {}
  export namespace SMALLINT {
    export const dataType = 'SMALLINT';
    export const keys = [];
  }

  export interface BIGINT extends DataType<typeof BIGINT.dataType> {}
  export namespace BIGINT {
    export const dataType = 'BIGINT';
    export const keys = [];
  }

  export interface DECIMAL extends DataType<typeof DECIMAL.dataType, { precision: number; scale: number }> {}
  export function DECIMAL(precision: number, scale: number): DECIMAL {
    return create(DECIMAL, { precision, scale });
  }
  export namespace DECIMAL {
    export const dataType = 'DECIMAL';
    export const keys = ['precision', 'scale'];
  }

  export interface NUMERIC extends DataType<typeof NUMERIC.dataType, { precision: number; scale: number }> {}
  export function NUMERIC(precision: number, scale: number): NUMERIC {
    return create(NUMERIC, { precision, scale });
  }
  export namespace NUMERIC {
    export const dataType = 'NUMERIC';
    export const keys = ['precision', 'scale'];
  }

  export interface FLOAT extends DataType<typeof FLOAT.dataType, { precision: number }> {}
  export function FLOAT(precision: number): FLOAT {
    return create(FLOAT, { precision });
  }
  export namespace FLOAT {
    export const dataType = 'FLOAT';
    export const keys = ['precision'];
  }

  export interface REAL extends DataType<typeof REAL.dataType> {}
  export namespace REAL {
    export const dataType = 'REAL';
    export const keys = [];
  }

  export interface DOUBLE_PRECISION extends DataType<typeof DOUBLE_PRECISION.dataType> {}
  export namespace DOUBLE_PRECISION {
    export const dataType = 'DOUBLE PRECISION';
    export const keys = [];
  }

  //
  // Temporal
  //
  export interface DATE extends DataType<typeof DATE.dataType> {}
  export namespace DATE {
    export const dataType = 'DATE';
    export const keys = [];
  }

  export interface TIME extends DataType<typeof TIME.dataType> {}
  export namespace TIME {
    export const dataType = 'TIME';
    export const keys = [];
  }

  export interface TIMESTAMP extends DataType<typeof TIMESTAMP.dataType> {}
  export namespace TIMESTAMP {
    export const dataType = 'TIMESTAMP';
    export const keys = [];
  }

  export interface INTERVAL extends DataType<typeof INTERVAL.dataType> {}
  export namespace INTERVAL {
    export const dataType = 'INTERVAL';
    export const keys = [];
  }

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

  function isEmpty(anyValue: unknown[]): anyValue is never[] {
    return anyValue.length === 0;
  }

  /**
   *
   * @param data - the data to stringify
   * @returns the string representation
   */
  export function stringify(data: SQLDataType): string {
    const { keys } = Modules[data.dataType];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    return `${data.dataType}${isEmpty(keys) ? '' : `(${keys.map((key) => (data as any)[key]).join(',')})`}`;
  }
}
