/** @jsx React.DOM */

'use strict';

var _ = require('lodash');
var React = require('react');

var Action = React.createClass({

  getInitialState: function () {
    return {
      move: false,
      resize: 0,
      refPoint: null
    };
  },

  startMove: function (evt) {
    this.setState({
      move: true,
      refPoint: {x: evt.clientX, y: evt.clientY}
    });
  },

  startResize: function (direction, evt) {
    this.setState({
      resize: direction === 'left' ? -1 : 1,
      refPoint: {x: evt.clientX, y: evt.clientY}
    });
  },

  stopTransform: function () {
    this.setState(this.getInitialState());
  },

  handleMouseMove: function (evt) {
    if (this.state.move) {
      this.props.onMove(this, this.state.refPoint.x - evt.clientX);

    } else if (this.state.resize !== 0) {
      this.props.onResize(this, this.state.resize, this.state.refPoint.x - evt.clientX);
    }
  },

  render: function () {
    var actionWidth = this.props.duration * Action.SIZE;

    return <g transform={'translate( '+ this.props.t * Action.SIZE + ', 0)'}
              onMouseMove={this.handleMouseMove}
              onMouseUp={this.stopTransform}
              onMouseLeave={this.stopTransform}>

             <rect width={actionWidth} height={Action.SIZE}
                   rx="5" ry="5"
                   className="action"
                   onMouseDown={this.startMove}/>

             <rect width={Action.HANDLE_SIZE} height={Action.SIZE}
                   className="action-handle"
                   onMouseDown={_.partial(this.startResize, 'left')}/>

             <rect width={Action.HANDLE_SIZE} height={Action.SIZE}
                   transform={'translate('+ (actionWidth - Action.HANDLE_SIZE) +', 0)'}
                   className="action-handle"
                   onMouseDown={_.partial(this.startResize, 'right')}/></g>
  }
});

Action.SIZE = 75;
Action.HANDLE_SIZE = 10;

module.exports = Action;