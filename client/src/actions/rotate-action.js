/** @jsx React.DOM */

'use strict';

var React = require('react');
var Action = require('./action.js');

var RotateAction = React.createClass({
  render: function () {
    return this.transferPropsTo(
      <Action type="rotate"></Action>
    );
  }
});

module.exports = RotateAction;