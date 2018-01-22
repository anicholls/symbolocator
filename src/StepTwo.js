import React from 'react';

export default class StepTwo extends React.Component {
  render() {
    return (
      <div className="step">
        <p className="App-intro">
          Select a folder you'd like to search within
        </p>
        <input type="file" onChange={this.props.onFileChange}
          webkitdirectory="true" directory="true" multiple="true" />
      </div>
    )
  }
}
