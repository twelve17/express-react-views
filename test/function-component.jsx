import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { LocalsContext } from '../locals-context.mjs';
import { countTo } from './count-to.mjs';

function Index(props) {

  const context = useContext(LocalsContext);

  return (
    <div>
      <h1>{context.locals.mainTitle}</h1>
      <p>Welcome to {props.title}</p>
      <p>
        I can count to 10:
        {countTo(10)}
      </p>
    </div>
  );
}

Index.propTypes = {
  title: PropTypes.string,
};

export default Index;
