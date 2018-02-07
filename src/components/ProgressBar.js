import React from 'react';

export default class ProgressBar extends React.Component {
  render() {
    return (
      <div className="progress-bar">
        <div className="progress" style={{ width: this.props.percentage * 100 + '%' }}></div>
      </div>
    )
  }
}
