import React from 'react';

export default class StepOne extends React.Component {
  onSubmit(e) {
    e.preventDefault()

    const input = e.target.elements[0]

    this.props.onSymbolName(input.value)
  }

  render() {
    if (!this.props.visible) {
      return null
    }

    return (
      <div className="step">
        <p className="App-intro">
          Enter the name of the symbol you're looking for (the artboard name)
        </p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" placeholder="Enter a symbol name" />
        </form>
      </div>
    )
  }
}
