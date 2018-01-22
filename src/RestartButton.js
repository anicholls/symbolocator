import React from 'react';

export default class RestartButton extends React.Component {
  render() {
    return (<button onClick={this.props.onClick}>Restart</button>);
  }
}
