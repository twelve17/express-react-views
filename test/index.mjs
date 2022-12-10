import assert from 'assert';
import chokidar from 'chokidar';
import path from 'path';
import { fileURLToPath } from 'url';

import { createEngine } from '../index.mjs';

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename)
const parentDir = path.join(__dirname, '../');

const viewOptions = {
  locals: { mainTitle: 'Testing' },
  title: 'Other Title',
  settings: {
    env: 'development',
    views: [__dirname, `${parentDir}/locals-context.mjs`]
  },
};

const renderFile = createEngine();

function testComponent(path) {
  renderFile(path, viewOptions, function (err, source) {
    if (err) {
      throw err;
    }
    assert.equal(
      source,
      `<!DOCTYPE html><div><h1>Testing</h1><p>Welcome to Other Title</p><p>I can count to 10:1, 2, 3, 4, 5, 6, 7, 8, 9, 10</p></div>`,
      `Rendering ${path}: generated expected content`
    );
  });
}

export async function runTests() {
  const filePrefixes = ['es5', 'es6', 'function'];
  const [firstPrefix, ...otherPrefixes] = filePrefixes;

  const dirName = prefix =>  `${__dirname}/${prefix}-component.jsx`;

  const results = [];

  try {
    const fn = async (prefix) => {
      try {
        await testComponent(dirName(prefix));
        results.push({ prefix, status: 'OK' });
      } catch (error) {
        results.push({ prefix, status: 'ERROR', error });
      }
    }

    await otherPrefixes.reduce(async (lastStep, prefix) => {
      await lastStep;
      return fn(prefix);
    }, fn(firstPrefix));
  } catch (error) {
    results.push({ prefix: otherPrefixes[otherPrefixes.length - 1], error });
  }

  console.log("Test results:", results);
}

runTests().then(() => {

  if (process.env['TEST_WATCH']) {

    const dirGlob = path.join(__dirname, '*.*');
    const parentDirGlob = path.join(parentDir, '*.mjs');
    const watchList = [dirGlob, parentDirGlob];

    console.log(`Watching for changes in ${watchList}...`);

    const watcher = chokidar.watch(watchList);

    watcher.on('change', async path => {
      console.log(`File ${path} has been changed`);
      runTests().then(() => {
        console.log("Watching for changes...");
      })
    });
  }
});