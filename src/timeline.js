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

  addAction: function (action) {
    var actions = _(this.state.actions.concat(action))
      .sortBy('t')
      .reduce(resolveOverlapWithPrevAction, []);

    this.setState({actions: actions});
  },

  handleClick: function (evt) {
    this.addAction({
      t: (evt.clientX - (Action.SIZE / 2)) / Action.SIZE,
      duration: 1
    });
  },

  handleActionMove: function (action, deltaX) {
    var actions = _(this.state.actions);

    _.remove(actions, {t: action.t});

    this.addAction(actions, {
      t: action.t + deltaX,
      duration: action.duration
    });
  },

  render: function () {
    var self = this;

    var actions =  _.map(this.state.actions, function (action) {
      return <Action t={action.t}
                     duration={action.duration}
                     onMove={self.handleActionMove}/>
    });

    return <svg width="100%" height={Action.SIZE}
                className="timeline"
                onClick={this.handleClick}>{actions}</svg>
  }
});


function resolveOverlapWithPrevAction (actions, action, index) {
  var prevAction = actions[index - 1];

  if (prevAction && getOverlap(prevAction, action) > 0) {

    return actions.concat({
      t: action.t + getOverlap(prevAction, action),
      duration: action.duration
    });
  }

  return actions.concat(action);
}

function getOverlap (prevAction, action) {
  return (prevAction.t + prevAction.duration) - action.t;
}


Timeline.SIZE = 50;

module.exports = Timeline;