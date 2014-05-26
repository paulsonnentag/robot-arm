/** @jsx React.DOM */

'use strict';

var _ = require('lodash');
var React = require('react');
var Timeline = require('./timeline.js');

var TimelineGroup = React.createClass({
  render: function () {

    var timelines = _.map(this.props.timelines, function (Action, index) {
      return <Timeline Action={Action} index={index}/>;
    });

    return <svg>{timelines}</svg>
  }

});

module.exports = TimelineGroup;