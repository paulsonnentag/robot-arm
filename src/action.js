/** @jsx React.DOM */

'use strict';

var _ = require('lodash');
var React = require('react');

var Action = React.createClass({

  getInitialState: function () {
    return {
      move: false,
      refPoint: null
    };
  },

  startMove: function (evt) {
    this.setState({
      move: true,
      refPoint: {x: evt.clientX, y: evt.clientY}
    });
  },

  stopTransform: function () {
    this.setState(this.getInitialState());
  },

  handleMouseMove: function (evt) {
    var deltaX;

    if (this.state.move) {
      deltaX = (evt.clientX - this.state.refPoint.x) / Action.SIZE;
      this.props.onMove(this.props, deltaX);

      this.setState({refPoint: {x: evt.clientX, y: evt.clientY}});
    }
  },

  stopPropagation: function (evt) {
    evt.stopPropagation()
  },

  render: function () {
    var actionWidth = this.props.duration * Action.SIZE;

    return <g transform={'translate('+ (this.props.t * Action.SIZE) + ', 0)'}
              onMouseMove={this.handleMouseMove}
              onMouseUp={this.stopTransform}
              onMouseLeave={this.stopTransform}
              onClick={this.stopPropagation}>

             <rect width={actionWidth - (2 * Action.HANDLE_SIZE)} height={Action.SIZE - (2 * Action.HANDLE_SIZE)}
                   rx="5" ry="5"
                   transform={'translate('+ Action.HANDLE_SIZE +', ' + Action.HANDLE_SIZE + ')'}
                   className="action"
                   onMouseDown={this.startMove}/></g>
  }
});


Action.SIZE = 75;
Action.HANDLE_SIZE = 4;

module.exports = Action;