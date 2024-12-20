import { describe, it, expect } from 'vitest';
import * as LogLevelValue from './LogLevelValue.js';

describe('LogLevelValue', () => {
  it('has values', () => {
    expect(LogLevelValue).toMatchInlineSnapshot(`
      {
        "LogLevelValue": {
          "Critical": {
            "_": "LogLevel",
            "name": "critical",
            "value": 50,
          },
          "Debug": {
            "_": "LogLevel",
            "name": "debug",
            "value": 10,
          },
          "Error": {
            "_": "LogLevel",
            "name": "error",
            "value": 40,
          },
          "Info": {
            "_": "LogLevel",
            "name": "info",
            "value": 20,
          },
          "None": {
            "_": "LogLevel",
            "name": "none",
            "value": 0,
          },
          "Warn": {
            "_": "LogLevel",
            "name": "warn",
            "value": 30,
          },
        },
      }
    `);
  });
});
