import { describe, it, expect } from 'vitest';
import { SQLDataType } from './SQLDataType.js';

describe('SQLDataType', () => {
  describe('.CHAR', () => {
    it('should return a correct record', () => {
      expect(SQLDataType.CHAR(2)).toEqual({ dataType: 'CHAR', size: 2 });
    });
    it('should be correctly stringified', () => {
      expect(SQLDataType.format(SQLDataType.CHAR(2))).toEqual('CHAR(2)');
    });
  });
  describe('.VARCHAR', () => {
    it('should return a correct record', () => {
      expect(SQLDataType.VARCHAR(2)).toEqual({ dataType: 'VARCHAR', size: 2 });
    });
    it('should be correctly stringified', () => {
      expect(SQLDataType.format(SQLDataType.VARCHAR(2))).toEqual('VARCHAR(2)');
    });
  });
  describe('.NCHAR', () => {
    it('should return a correct record', () => {
      expect(SQLDataType.NCHAR(2)).toEqual({ dataType: 'NCHAR', size: 2 });
    });
    it('should be correctly stringified', () => {
      expect(SQLDataType.format(SQLDataType.NCHAR(2))).toEqual('NCHAR(2)');
    });
  });
  describe('.NVARCHAR', () => {
    it('should return a correct record', () => {
      expect(SQLDataType.NVARCHAR(2)).toEqual({ dataType: 'NVARCHAR', size: 2 });
    });
    it('should be correctly stringified', () => {
      expect(SQLDataType.format(SQLDataType.NVARCHAR(2))).toEqual('NVARCHAR(2)');
    });
  });
  describe('.CLOB', () => {
    it('should return a correct record', () => {
      expect(SQLDataType.CLOB).toEqual(expect.objectContaining({ dataType: 'CLOB' }));
    });
    it('should be correctly stringified', () => {
      expect(SQLDataType.format(SQLDataType.CLOB)).toEqual('CLOB');
    });
  });
  describe('.BOOLEAN', () => {
    it('should return a correct record', () => {
      expect(SQLDataType.BOOLEAN).toEqual(expect.objectContaining({ dataType: 'BOOLEAN' }));
    });
    it('should be correctly stringified', () => {
      expect(SQLDataType.format(SQLDataType.BOOLEAN)).toEqual('BOOLEAN');
    });
  });
  describe('.BINARY', () => {
    it('should return a correct record', () => {
      expect(SQLDataType.BINARY(2)).toEqual({ dataType: 'BINARY', byteLength: 2 });
    });
    it('should be correctly stringified', () => {
      expect(SQLDataType.format(SQLDataType.BINARY(2))).toEqual('BINARY(2)');
    });
  });
  describe('.VARBINARY', () => {
    it('should return a correct record', () => {
      expect(SQLDataType.VARBINARY(2)).toEqual({ dataType: 'VARBINARY', byteLength: 2 });
    });
    it('should be correctly stringified', () => {
      expect(SQLDataType.format(SQLDataType.VARBINARY(2))).toEqual('VARBINARY(2)');
    });
  });
  describe('.BLOB', () => {
    it('should return a correct record', () => {
      expect(SQLDataType.BLOB).toEqual(expect.objectContaining({ dataType: 'BLOB' }));
    });
    it('should be correctly stringified', () => {
      expect(SQLDataType.format(SQLDataType.BLOB)).toEqual('BLOB');
    });
  });
  describe('.INTEGER', () => {
    it('should return a correct record', () => {
      expect(SQLDataType.INTEGER).toEqual(expect.objectContaining({ dataType: 'INTEGER' }));
    });
    it('should be correctly stringified', () => {
      expect(SQLDataType.format(SQLDataType.INTEGER)).toEqual('INTEGER');
    });
  });
  describe('.SMALLINT', () => {
    it('should return a correct record', () => {
      expect(SQLDataType.SMALLINT).toEqual(expect.objectContaining({ dataType: 'SMALLINT' }));
    });
    it('should be correctly stringified', () => {
      expect(SQLDataType.format(SQLDataType.SMALLINT)).toEqual('SMALLINT');
    });
  });
  describe('.BIGINT', () => {
    it('should return a correct record', () => {
      expect(SQLDataType.BIGINT).toEqual(expect.objectContaining({ dataType: 'BIGINT' }));
    });
    it('should be correctly stringified', () => {
      expect(SQLDataType.format(SQLDataType.BIGINT)).toEqual('BIGINT');
    });
  });
  describe('.DECIMAL', () => {
    it('should return a correct record', () => {
      expect(SQLDataType.DECIMAL(2, 10)).toEqual({ dataType: 'DECIMAL', precision: 2, scale: 10 });
    });
    it('should be correctly stringified', () => {
      expect(SQLDataType.format(SQLDataType.DECIMAL(2, 10))).toEqual('DECIMAL(2,10)');
    });
  });
  describe('.NUMERIC', () => {
    it('should return a correct record', () => {
      expect(SQLDataType.NUMERIC(2, 10)).toEqual({ dataType: 'NUMERIC', precision: 2, scale: 10 });
    });
    it('should be correctly stringified', () => {
      expect(SQLDataType.format(SQLDataType.NUMERIC(2, 10))).toEqual('NUMERIC(2,10)');
    });
  });
  describe('.FLOAT', () => {
    it('should return a correct record', () => {
      expect(SQLDataType.FLOAT(2)).toEqual({ dataType: 'FLOAT', precision: 2 });
    });
    it('should be correctly stringified', () => {
      expect(SQLDataType.format(SQLDataType.FLOAT(2))).toEqual('FLOAT(2)');
    });
  });
  describe('.REAL', () => {
    it('should return a correct record', () => {
      expect(SQLDataType.REAL).toEqual(expect.objectContaining({ dataType: 'REAL' }));
    });
    it('should be correctly stringified', () => {
      expect(SQLDataType.format(SQLDataType.REAL)).toEqual('REAL');
    });
  });
  describe('.DOUBLE PRECISION', () => {
    it('should return a correct record', () => {
      expect(SQLDataType.DOUBLE_PRECISION).toEqual(expect.objectContaining({ dataType: 'DOUBLE PRECISION' }));
    });
    it('should be correctly stringified', () => {
      expect(SQLDataType.format(SQLDataType.DOUBLE_PRECISION)).toEqual('DOUBLE PRECISION');
    });
  });
  describe('.DATE', () => {
    it('should return a correct record', () => {
      expect(SQLDataType.DATE).toEqual(expect.objectContaining({ dataType: 'DATE' }));
    });
    it('should be correctly stringified', () => {
      expect(SQLDataType.format(SQLDataType.DATE)).toEqual('DATE');
    });
  });
  describe('.TIME', () => {
    it('should return a correct record', () => {
      expect(SQLDataType.TIME).toEqual(expect.objectContaining({ dataType: 'TIME' }));
    });
    it('should be correctly stringified', () => {
      expect(SQLDataType.format(SQLDataType.TIME)).toEqual('TIME');
    });
  });
  describe('.TIMESTAMP', () => {
    it('should return a correct record', () => {
      expect(SQLDataType.TIMESTAMP).toEqual(expect.objectContaining({ dataType: 'TIMESTAMP' }));
    });
    it('should be correctly stringified', () => {
      expect(SQLDataType.format(SQLDataType.TIMESTAMP)).toEqual('TIMESTAMP');
    });
  });
  describe('.INTERVAL', () => {
    it('should return a correct record', () => {
      expect(SQLDataType.INTERVAL).toEqual(expect.objectContaining({ dataType: 'INTERVAL' }));
    });
    it('should be correctly stringified', () => {
      expect(SQLDataType.format(SQLDataType.INTERVAL)).toEqual('INTERVAL');
    });
  });
});
