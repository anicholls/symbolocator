import React from 'react';

export default class StepTwo extends React.Component {

  render() {
    if (!this.props.visible) {
      return null
    }

    return (
      <div className="step">
        <p className="App-intro">
          Select the folder you would like to search within
        </p>
        <input type="file" onChange={this.props.onFileChange}
          webkitdirectory="true" directory="true" multiple="true"
          readOnly={this.props.isElectron} />
      </div>
    )
  }
}
