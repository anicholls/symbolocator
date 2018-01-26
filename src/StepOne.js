import React from 'react';

export default class StepOne extends React.Component {
  render() {
    if (!this.props.visible) {
      return null
    }

    return (
      <div className="step">
        <p className="App-intro">
          Enter the name of the symbol you're looking for (the artboard name)
        </p>
        <form onSubmit={this.props.onSubmit}>
          <input type="text" placeholder="Enter a symbol name" />
        </form>
      </div>
    )
  }
}
