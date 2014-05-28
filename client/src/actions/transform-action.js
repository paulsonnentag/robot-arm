/** @jsx React.DOM */

'use strict';

var React = require('react');
var Action = require('./action.js');

var TransformAction = React.createClass({
  render: function () {
    return this.transferPropsTo(
      <Action type="transform"></Action>
    );
  }
});

module.exports = TransformAction;