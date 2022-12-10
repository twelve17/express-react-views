import assert from 'assert';
import async from 'async';
import { createEngine } from '../index.mjs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const viewOptions = {
  locals: { mainTitle: 'Testing' },
  settings: {
    env: 'development',
    views: __dirname,
  },
};

function testComponent(path, cb) {

  const renderFile = createEngine();
  renderFile(path, viewOptions, function (err, source) {
    console.error('Error rendering: ', err);
    assert(!err, `Rendering ${path} threw error: ${err}`);
    assert.equal(
      source,
      '<!DOCTYPE html><div><h1></h1><p>Welcome to </p><p>I can count to 10:1, 2, 3, 4, 5, 6, 7, 8, 9, 10</p></div>',
      `Rendering ${path}: generated expected content`
    );
    cb();
  });
}

async.series(
  [
    function testES5Module(next) {
      testComponent(__dirname + '/es5-component.jsx', next);
    },
    function testES6Module(next) {
      testComponent(__dirname + '/es6-component.jsx', next);
    },
    function testES6FlowModule(next) {
      testComponent(__dirname + '/es6-flow-component.jsx', next);
    },
  ],
  function done() {
    console.log('All tests pass!');
    process.exit(0);
  }
);
