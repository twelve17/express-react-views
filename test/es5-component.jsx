import React from 'react';
import PropTypes from 'prop-types';
import createClass from 'create-react-class';
import LocalsContext from '../';

function countTo(n) {
  var a = [];
  for (var i = 0; i < n; i++) {
    a.push(i + 1);
  }
  return a.join(', ');
}

export default Index = createClass({
  propTypes: {
    title: PropTypes.string,
  },


  render: function() {
    <LocalsContext.Consumer>{function(locals) {
    return (
      <div>
        <h1>{locals.title}</h1>
        <p>Welcome to {this.props.title}</p>
        <p>
          I can count to 10:
          {countTo(10)}
        </p>
      </div>
    );
    }}</LocalsContext.Consumer>
  },
});