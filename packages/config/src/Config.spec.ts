import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs/promises';
import nodePath from 'node:path';
import os from 'node:os';
import { Config } from './Config.js';
import { Task } from '@w5s/task';
import type { FilePath } from '@w5s/system';
import { ConfigErrorType } from './ConfigError.js';

const asFilePath = (value: string) => value as FilePath;

async function createTempDir(): Promise<string> {
  return fs.mkdtemp(nodePath.join(os.tmpdir(), 'w5s-config-'));
}

async function writeFile(filePath: string, content: string): Promise<void> {
  await fs.mkdir(nodePath.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, 'utf8');
}

describe('Config', () => {
  it('searches the nearest configuration first', async () => {
    const root = await createTempDir();
    const child = nodePath.join(root, 'child');

    await writeFile(nodePath.join(root, '.myapprc.json'), '{"root": true}');
    await writeFile(nodePath.join(child, '.myapprc.json'), '{"child": true}');

    const explorer = Config<{ child?: boolean }>('myapp');
    const result = await Task.run(explorer.search(asFilePath(child)));

    expect(result.ok).toBe(true);
    expect(result.value?.filepath).toBe(nodePath.join(child, '.myapprc.json'));
    expect(result.value?.config).toEqual({ child: true });
  });

  it('respects stopDir when searching', async () => {
    const root = await createTempDir();
    const child = nodePath.join(root, 'child');
    const grandChild = nodePath.join(child, 'grand');

    await writeFile(nodePath.join(root, '.myapprc.json'), '{"root": true}');

    const explorer = Config('myapp', { stopDir: asFilePath(child) });
    const result = await Task.run(explorer.search(asFilePath(grandChild)));

    expect(result.ok).toBe(true);
    expect(result.value).toBeUndefined();
  });

  it('loads JSON config files', async () => {
    const root = await createTempDir();
    const filePath = nodePath.join(root, '.myapprc.json');

    await writeFile(filePath, '{"value": 123}');

    const explorer = Config<{ value: number }>('myapp');
    const result = await Task.run(explorer.load(asFilePath(filePath)));

    expect(result.ok).toBe(true);
    expect(result.value?.config).toEqual({ value: 123 });
  });

  it('loads JS module config files', async () => {
    const root = await createTempDir();
    const mjsPath = nodePath.join(root, 'myapp.config.mjs');
    const cjsPath = nodePath.join(root, 'myapp.config.cjs');

    await writeFile(mjsPath, 'export default { value: 42 };');
    await writeFile(cjsPath, 'module.exports = { value: 77 };');

    const explorer = Config<{ value: number }>('myapp');

    const mjsResult = await Task.run(explorer.load(asFilePath(mjsPath)));
    expect(mjsResult.ok).toBe(true);
    expect(mjsResult.value?.config).toEqual({ value: 42 });

    const cjsResult = await Task.run(explorer.load(asFilePath(cjsPath)));
    expect(cjsResult.ok).toBe(true);
    expect(cjsResult.value?.config).toEqual({ value: 77 });
  });

  it('loads config from package.json', async () => {
    const root = await createTempDir();
    const packagePath = nodePath.join(root, 'package.json');

    await writeFile(packagePath, '{"name": "demo", "myapp": {"enabled": true}}');

    const explorer = Config<{ enabled: boolean }>('myapp');
    const result = await Task.run(explorer.load(asFilePath(packagePath)));

    expect(result.ok).toBe(true);
    expect(result.value?.config).toEqual({ enabled: true });
  });

  it('marks empty JSON files as empty configs', async () => {
    const root = await createTempDir();
    const filePath = nodePath.join(root, '.myapprc');

    await writeFile(filePath, '');

    const explorer = Config('myapp');
    const result = await Task.run(explorer.search(asFilePath(root)));

    expect(result.ok).toBe(true);
    expect(result.value?.filepath).toBe(filePath);
    expect(result.value?.isEmpty).toBe(true);
  });

  it('returns ParseError for invalid JSON', async () => {
    const root = await createTempDir();
    const filePath = nodePath.join(root, '.myapprc.json');

    await writeFile(filePath, '{ invalid }');

    const explorer = Config('myapp');
    const result = await Task.run(explorer.load(asFilePath(filePath)));

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.configErrorType).toBe(ConfigErrorType.ParseError);
    }
  });

  it('returns NotFound when loading a missing file', async () => {
    const root = await createTempDir();
    const filePath = nodePath.join(root, '.missingrc');

    const explorer = Config('myapp');
    const result = await Task.run(explorer.load(asFilePath(filePath)));

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.configErrorType).toBe(ConfigErrorType.NotFound);
    }
  });

  it('caches load results when enabled', async () => {
    const root = await createTempDir();
    const filePath = nodePath.join(root, '.myapprc.json');

    await writeFile(filePath, '{"value": 1}');

    let calls = 0;
    const explorer = Config<{ value: number }>('myapp', {
      loaders: {
        '.json': (filepath, content) => {
          calls += 1;
          return Config.defaultLoaders<{ value: number }>('myapp')['.json'](filepath, content);
        },
      },
    });

    await Task.run(explorer.load(asFilePath(filePath)));
    await Task.run(explorer.load(asFilePath(filePath)));

    expect(calls).toBe(1);
  });
});
