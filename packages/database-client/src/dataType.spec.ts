import { SQLDataType } from './dataType.js';

describe('SQLDataType', () => {
  describe('.CHAR', () => {
    test('should return a correct record', () => {
      expect(SQLDataType.CHAR(2)).toEqual({ dataType: 'CHAR', size: 2 });
    });
    test('should be correctly stringified', () => {
      expect(SQLDataType.stringify(SQLDataType.CHAR(2))).toEqual('CHAR(2)');
    });
  });
  describe('.VARCHAR', () => {
    test('should return a correct record', () => {
      expect(SQLDataType.VARCHAR(2)).toEqual({ dataType: 'VARCHAR', size: 2 });
    });
    test('should be correctly stringified', () => {
      expect(SQLDataType.stringify(SQLDataType.VARCHAR(2))).toEqual('VARCHAR(2)');
    });
  });
  describe('.NCHAR', () => {
    test('should return a correct record', () => {
      expect(SQLDataType.NCHAR(2)).toEqual({ dataType: 'NCHAR', size: 2 });
    });
    test('should be correctly stringified', () => {
      expect(SQLDataType.stringify(SQLDataType.NCHAR(2))).toEqual('NCHAR(2)');
    });
  });
  describe('.NVARCHAR', () => {
    test('should return a correct record', () => {
      expect(SQLDataType.NVARCHAR(2)).toEqual({ dataType: 'NVARCHAR', size: 2 });
    });
    test('should be correctly stringified', () => {
      expect(SQLDataType.stringify(SQLDataType.NVARCHAR(2))).toEqual('NVARCHAR(2)');
    });
  });
  describe('.CLOB', () => {
    test('should return a correct record', () => {
      expect(SQLDataType.CLOB).toEqual(expect.objectContaining({ dataType: 'CLOB' }));
    });
    test('should be correctly stringified', () => {
      expect(SQLDataType.stringify(SQLDataType.CLOB)).toEqual('CLOB');
    });
  });
  describe('.BOOLEAN', () => {
    test('should return a correct record', () => {
      expect(SQLDataType.BOOLEAN).toEqual(expect.objectContaining({ dataType: 'BOOLEAN' }));
    });
    test('should be correctly stringified', () => {
      expect(SQLDataType.stringify(SQLDataType.BOOLEAN)).toEqual('BOOLEAN');
    });
  });
  describe('.BINARY', () => {
    test('should return a correct record', () => {
      expect(SQLDataType.BINARY(2)).toEqual({ dataType: 'BINARY', byteLength: 2 });
    });
    test('should be correctly stringified', () => {
      expect(SQLDataType.stringify(SQLDataType.BINARY(2))).toEqual('BINARY(2)');
    });
  });
  describe('.VARBINARY', () => {
    test('should return a correct record', () => {
      expect(SQLDataType.VARBINARY(2)).toEqual({ dataType: 'VARBINARY', byteLength: 2 });
    });
    test('should be correctly stringified', () => {
      expect(SQLDataType.stringify(SQLDataType.VARBINARY(2))).toEqual('VARBINARY(2)');
    });
  });
  describe('.BLOB', () => {
    test('should return a correct record', () => {
      expect(SQLDataType.BLOB).toEqual(expect.objectContaining({ dataType: 'BLOB' }));
    });
    test('should be correctly stringified', () => {
      expect(SQLDataType.stringify(SQLDataType.BLOB)).toEqual('BLOB');
    });
  });
  describe('.INTEGER', () => {
    test('should return a correct record', () => {
      expect(SQLDataType.INTEGER).toEqual(expect.objectContaining({ dataType: 'INTEGER' }));
    });
    test('should be correctly stringified', () => {
      expect(SQLDataType.stringify(SQLDataType.INTEGER)).toEqual('INTEGER');
    });
  });
  describe('.SMALLINT', () => {
    test('should return a correct record', () => {
      expect(SQLDataType.SMALLINT).toEqual(expect.objectContaining({ dataType: 'SMALLINT' }));
    });
    test('should be correctly stringified', () => {
      expect(SQLDataType.stringify(SQLDataType.SMALLINT)).toEqual('SMALLINT');
    });
  });
  describe('.BIGINT', () => {
    test('should return a correct record', () => {
      expect(SQLDataType.BIGINT).toEqual(expect.objectContaining({ dataType: 'BIGINT' }));
    });
    test('should be correctly stringified', () => {
      expect(SQLDataType.stringify(SQLDataType.BIGINT)).toEqual('BIGINT');
    });
  });
  describe('.DECIMAL', () => {
    test('should return a correct record', () => {
      expect(SQLDataType.DECIMAL(2, 10)).toEqual({ dataType: 'DECIMAL', precision: 2, scale: 10 });
    });
    test('should be correctly stringified', () => {
      expect(SQLDataType.stringify(SQLDataType.DECIMAL(2, 10))).toEqual('DECIMAL(2,10)');
    });
  });
  describe('.NUMERIC', () => {
    test('should return a correct record', () => {
      expect(SQLDataType.NUMERIC(2, 10)).toEqual({ dataType: 'NUMERIC', precision: 2, scale: 10 });
    });
    test('should be correctly stringified', () => {
      expect(SQLDataType.stringify(SQLDataType.NUMERIC(2, 10))).toEqual('NUMERIC(2,10)');
    });
  });
  describe('.FLOAT', () => {
    test('should return a correct record', () => {
      expect(SQLDataType.FLOAT(2)).toEqual({ dataType: 'FLOAT', precision: 2 });
    });
    test('should be correctly stringified', () => {
      expect(SQLDataType.stringify(SQLDataType.FLOAT(2))).toEqual('FLOAT(2)');
    });
  });
  describe('.REAL', () => {
    test('should return a correct record', () => {
      expect(SQLDataType.REAL).toEqual(expect.objectContaining({ dataType: 'REAL' }));
    });
    test('should be correctly stringified', () => {
      expect(SQLDataType.stringify(SQLDataType.REAL)).toEqual('REAL');
    });
  });
  describe('.DOUBLE PRECISION', () => {
    test('should return a correct record', () => {
      expect(SQLDataType.DOUBLE_PRECISION).toEqual(expect.objectContaining({ dataType: 'DOUBLE PRECISION' }));
    });
    test('should be correctly stringified', () => {
      expect(SQLDataType.stringify(SQLDataType.DOUBLE_PRECISION)).toEqual('DOUBLE PRECISION');
    });
  });
  describe('.DATE', () => {
    test('should return a correct record', () => {
      expect(SQLDataType.DATE).toEqual(expect.objectContaining({ dataType: 'DATE' }));
    });
    test('should be correctly stringified', () => {
      expect(SQLDataType.stringify(SQLDataType.DATE)).toEqual('DATE');
    });
  });
  describe('.TIME', () => {
    test('should return a correct record', () => {
      expect(SQLDataType.TIME).toEqual(expect.objectContaining({ dataType: 'TIME' }));
    });
    test('should be correctly stringified', () => {
      expect(SQLDataType.stringify(SQLDataType.TIME)).toEqual('TIME');
    });
  });
  describe('.TIMESTAMP', () => {
    test('should return a correct record', () => {
      expect(SQLDataType.TIMESTAMP).toEqual(expect.objectContaining({ dataType: 'TIMESTAMP' }));
    });
    test('should be correctly stringified', () => {
      expect(SQLDataType.stringify(SQLDataType.TIMESTAMP)).toEqual('TIMESTAMP');
    });
  });
  describe('.INTERVAL', () => {
    test('should return a correct record', () => {
      expect(SQLDataType.INTERVAL).toEqual(expect.objectContaining({ dataType: 'INTERVAL' }));
    });
    test('should be correctly stringified', () => {
      expect(SQLDataType.stringify(SQLDataType.INTERVAL)).toEqual('INTERVAL');
    });
  });
});
