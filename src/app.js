/** @jsx React.DOM */

var React = require('react');

var Timeline = require('./timeline.js');

var actions = [
  {t: 0, duration: 1},
  {t: 2, duration: 2},
  {t: 7, duration: 3}
];

React.renderComponent(
  <Timeline actions={actions}></Timeline>,
  document.body
);