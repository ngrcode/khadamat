import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const sourceRoot = fileURLToPath(new URL('../src/', import.meta.url));

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = `${directory}/${entry.name}`;
    return entry.isDirectory() ? sourceFiles(path) : /\.[jt]sx?$/.test(path) ? [path] : [];
  });
}

test('legacy views are migrated to features', () => {
  assert.equal(existsSync(`${sourceRoot}/view`), false);
  sourceFiles(sourceRoot).forEach((path) => {
    assert.doesNotMatch(readFileSync(path, 'utf8'), /@\/view\//);
  });
});

test('feature domains use named atomic layers', () => {
  const featuresRoot = `${sourceRoot}/features`;
  assert.equal(existsSync(featuresRoot), true);
  sourceFiles(featuresRoot).forEach((path) => {
    assert.doesNotMatch(path, /\/components\//);
    assert.doesNotMatch(path, /\/(view|viewModel)\.[jt]sx?$/);
  });
});
