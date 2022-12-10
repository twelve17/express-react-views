import React from 'react';
import PropTypes from  'prop-types';

import { LocalsContext } from '../locals-context.mjs';
import { countTo } from './count-to.mjs';

class Index extends React.Component {
  render() {
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
  }
}

Index.propTypes = {
  title: PropTypes.string,
};

Index.contextType = LocalsContext;

export default Index;
