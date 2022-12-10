import React from 'react';
import PropTypes from 'prop-types';
import createClass from 'create-react-class';

import { LocalsContext } from '../locals-context.mjs';
import { countTo } from './count-to.mjs';

const Index = createClass({
  propTypes: {
    title: PropTypes.string,
  },

  render: function () {
    return (
      <div>
        <h1>{this.context.locals.mainTitle}</h1>

        <p>Welcome to {this.props.title}</p>
        <p>
          I can count to 10:
          {countTo(10)}
        </p>
      </div>
    );
  },
});

Index.contextType = LocalsContext;

export default Index;