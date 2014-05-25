/** @jsx React.DOM */

'use strict';

var React = require('react');

var Action = React.createClass({
  render: function () {
    return <rect width={this.props.duration * Action.SIZE} height={Action.SIZE}
                 transform={'translate( '+ this.props.t * Action.SIZE + ', 0)'}
                 rx="5" ry="5"
                 className="action" />
  }
});

Action.SIZE = 75;

module.exports = Action;