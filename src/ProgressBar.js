import React from 'react';

export default class StepOne extends React.Component {
  render() {
    if (!this.props.visible) {
      return null
    }

    return (
      <div className="progress-bar">
        <div className="progress" style={{ width: this.props.percentage * 100 + '%' }}></div>
      </div>
    )
  }
}
