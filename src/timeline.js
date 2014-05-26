/** @jsx React.DOM */

'use strict';

var _ = require('lodash');
var React = require('react');
var Action = require('./actions/action.js');

var Timeline = React.createClass({

  getInitialState: function () {
    return {
      actions: [
        {t: 0, duration: 1},
        {t: 2, duration: 1},
        {t: 4, duration: 1},
        {t: 8, duration: 1}
      ]
    };
  },

  addAction: function (action) {
    var actions = _(this.state.actions.concat(action))
      .sortBy('t')
      .reduce(resolveOverlapWithAdjacentAction, [])
      .reverse()
      .reduce(resolveOverlapWithAdjacentAction, []);

    this.setState({actions: actions});
  },

  handleClick: function (evt) {
    this.addAction({
      t: (evt.clientX - (Action.SIZE / 2)) / Action.SIZE,
      duration: 1
    });
  },

  handleActionMove: function (action, deltaX) {
    var actions = _(this.state.actions)
      .map(_.partial(moveAction, action, deltaX))
      .sortBy(_.partial(timeOrder, deltaX))
      .reduce(resolveOverlapWithAdjacentAction, [])
      .reverse()
      .reduce(resolveOverlapWithAdjacentAction, []);

    this.setState({actions: actions});
  },

  render: function () {
    var self = this;

    var actions =  _.map(this.state.actions, function (action) {
      return self.props.Action({
        t: action.t,
        duration: action.duration,
        onMove: self.handleActionMove
      });
    });

    return <svg width="100%" height={Action.SIZE}
                className="timeline">{actions}</svg>
  }
});

function resolveOverlapWithAdjacentAction (actions, action, index) {
  var overlap;
  var adjacentAction = actions[index - 1];

  if (!adjacentAction) {
    return actions.concat(action);
  }

  overlap = getOverlap(adjacentAction, action);

  if (overlap !== 0) {
    return actions.concat({
      t: Math.max(0, action.t + overlap),
      duration: action.duration
    });
  }

  return actions.concat(action);
}

function getOverlap (action1, action2) {
  var edgeL1 = action1.t;
  var edgeR1 = action1.t + action1.duration;
  var edgeL2 = action2.t;
  var edgeR2 = action2.t + action2.duration;

  if (edgeL2 < edgeR1 && edgeR2 >= edgeR1) { // overlap from left
    return edgeR1 - edgeL2;
  }

  if (edgeR2 > edgeL1 && edgeL2 < edgeL1) { // overlap from right
    return edgeL1 - edgeR2;
  }

  return 0;
}

function moveAction (newAction, deltaX, action) {
  if (action.t === newAction.t) {
    return {
      t: Math.max(0, action.t + deltaX),
      duration: action.duration
    }
  }

  return action;
}

function timeOrder (order, action) {
  return order * action.t;
}

module.exports = Timeline;