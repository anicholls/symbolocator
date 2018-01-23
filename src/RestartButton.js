import React from 'react';

export default class RestartButton extends React.Component {
  render() {
    if (!this.props.visible) {
      return null
    }

    return (<button onClick={this.props.onClick}>Restart</button>);
  }
}
