/** @jsx React.DOM */

'use strict';

var React = require('react');
var Action = require('./action.js');

var LightAction = React.createClass({
  render: function () {
    return this.transferPropsTo(
      <Action type="light"></Action>
    );
  }
});

module.exports = LightAction;