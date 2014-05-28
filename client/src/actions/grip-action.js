/** @jsx React.DOM */

'use strict';

var React = require('react');
var Action = require('./action.js');

var GripAction = React.createClass({
  render: function () {
    return this.transferPropsTo(
      <Action type="grip"></Action>
    );
  }
});

module.exports = GripAction;