import React from 'react';

export default class StepOne extends React.Component {
  render() {
    return (
      <div className="step">
        <p className="App-intro">
          Enter the name of the symbol you'd like to search for (the artboard name)
        </p>
        <form onSubmit={this.props.onSubmit}>
          <input type="text" placeholder="Enter a symbol name" /><br />
        </form>
      </div>
    )
  }
}
