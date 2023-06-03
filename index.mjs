/*
 *  Copyright (c) 2014, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import jsBeautify from 'js-beautify';
import _escaperegexp from 'lodash.escaperegexp';
import babelRegister from '@babel/register';
import {fileURLToPath} from 'url';

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

const beautifyHTML = jsBeautify.html;

const DEFAULT_OPTIONS = {
  doctype: '<!DOCTYPE html>',
  beautify: false,
  transformViews: true,
  babel: {
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
  },
};

/**
 * @param {*} engineOptions
 * @returns {function} renderFile
 */
export function createEngine(engineOptions) {
  var registered = false;
  var moduleDetectRegEx;

  engineOptions = {...DEFAULT_OPTIONS, ...engineOptions};

  async function renderFile(filename, options, cb) {
    // Defer babel registration until the first request so we can grab the view path.
    if (!moduleDetectRegEx) {
      // Path could contain regexp characters so escape it first.
      // options.settings.views could be a single string or an array
      moduleDetectRegEx = new RegExp(
        []
          .concat(options.settings.views)
          .map((viewPath) => '^' + _escaperegexp(viewPath))
          .join('|')
      );
    }

    if (engineOptions.transformViews && !registered) {
      // Passing a RegExp to Babel results in an issue on Windows so we'll just
      // pass the view path.
      babelRegister({
        only: [path.join(__dirname, 'locals-context.mjs')].concat(
          options.settings.views
        ),
        ...engineOptions.babel,
      });
      registered = true;
    }

    try {
      // LocalsContext must be "require"d here instead of via
      // import at the beginning of the file, since views
      // will be also loading the consumer this way.
      var {LocalsContext} = await import('./locals-context.mjs');

      var markup = engineOptions.doctype;
      var component = await import(filename);

      // Transpiled ES6 may export components as { default: Component }
      if (component.default) {
        const {default: blah} = await import(filename);
        component = blah;
      }
      markup += ReactDOMServer.renderToStaticMarkup(
        React.createElement(
          LocalsContext.Provider,
          {value: options},
          React.createElement(component, options)
        )
      );

      if (engineOptions.beautify) {
        // NOTE: This will screw up some things where whitespace is important, and be
        // subtly different than prod.
        markup = beautifyHTML(markup);
      }

      cb(null, markup);
    } catch (e) {
      return cb(e);
    }
  }

  return renderFile;
}
