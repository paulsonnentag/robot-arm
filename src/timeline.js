/** @jsx React.DOM */

'use strict';

var _ = require('lodash');
var React = require('react');
var Action = require('./action.js');

var Timeline = React.createClass({

  getInitialState: function () {
    return {
      actions: []
    };
  },

  addAction: function (t, duration) {
    var action = {
      t: t,
      duration: duration
    };

    this.setState({actions: this.state.actions.concat(action)});
  },

  handleClick: function (evt) {
    this.addAction((evt.clientX - (Action.SIZE / 2)) / Action.SIZE , 1)
  },

  handleActionMove: function (action, deltaX) {
    console.log('move', deltaX);
  },

  handleActionResize: function (action, side, deltaX) {
    console.log('resize', side, deltaX);
  },

  render: function () {
    var self = this;

    var actions =  _.map(this.state.actions, function (action) {
      return <Action t={action.t}
                     duration={action.duration}
                     onResize={self.handleActionResize}
                     onMove={self.handleActionMove}/>
    });

    return <svg width="100%" height={Action.SIZE}
                onClick={this.handleClick}>{actions}</svg>
  }
});

Timeline.SIZE = 50;

module.exports = Timeline;