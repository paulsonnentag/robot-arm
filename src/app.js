/** @jsx React.DOM */

var React = require('react');

var TimelineGroup = require('./timeline-group.js');
var GripAction = require('./actions/grip-action.js');
var LightAction = require('./actions/light-action.js');
var RotateAction = require('./actions/rotate-action.js');
var TransformAction = require('./actions/transform-action.js');

var actions = [
  {t: 0, duration: 1},
  {t: 2, duration: 2},
  {t: 7, duration: 3}
];

React.renderComponent(
  <TimelineGroup timelines={[GripAction, LightAction, RotateAction, TransformAction]}/>,
  document.body
);