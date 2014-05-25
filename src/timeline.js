/** @jsx React.DOM */

'use strict';

var _ = require('lodash');
var React = require('react');
var Action = require('./action.js');

var Timeline = React.createClass({
  render: function () {
    var actions =  _.map(this.props.actions, function (action) {
      return <Action t={action.t} duration={action.duration} />
    });

    return <svg width="100%" height={Action.SIZE}>{actions}</svg>
  }
});

Timeline.SIZE = 50;

module.exports = Timeline;