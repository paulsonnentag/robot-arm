/** @jsx React.DOM */

'use strict';

var _ = require('lodash');
var React = require('react');
var Timeline = require('./timeline.js');

var TimelineGroup = React.createClass({
  render: function () {

    var timelines = _.map(this.props.timelines, function (Action) {
      return <Timeline Action={Action}/>;
    });

    return <div>{timelines}</div>
  }

});

module.exports = TimelineGroup;