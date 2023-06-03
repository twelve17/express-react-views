import path from 'path';
import { fileURLToPath } from 'url';

import { createEngine } from '../index.mjs';
import { describe, test, expect } from '@jest/globals';

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

async function testComponent(path) {
  return new Promise((resolve, reject) => {
    renderFile(path, viewOptions, function (err, source) {
      if (err) {
        reject(err);
      }
      else {
        expect(source).toEqual(
          `<!DOCTYPE html><div><h1>Testing</h1><p>Welcome to Other Title</p><p>I can count to 10:1, 2, 3, 4, 5, 6, 7, 8, 9, 10</p></div>`,
          `Rendering ${path}: generated expected content`
        );
        resolve(source)
      }
    });
  });
}

describe('renderFile', () => {
  ['es5', 'es6', 'function'].forEach(prefix => {
    test(`renders ${prefix}-component.jsx`, async () => {
      const dirName = prefix => `${__dirname}/${prefix}-component.jsx`;

      await testComponent(dirName(prefix));
    });
  });

});