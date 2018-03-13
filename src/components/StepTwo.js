import React from 'react'

// window.require is only defined for electron
const {remote} = window.require('electron')

export default class StepTwo extends React.Component {
  _onFolderSelect(paths) {
    // The user closed the modal without selecting a folder
    // TODO: solve this better because it's an endless loop
    if (!paths) {
      this.onClick()
      return
    }

    // Electron only returns the path of the directory
    const path = paths[0]

    this.props.setPath(path)
  }

  onClick() {
    remote.dialog.showOpenDialog({
      properties: ['openDirectory']
    }, this._onFolderSelect.bind(this))
  }

  render() {
    if (!this.props.visible) {
      return null
    }

    return (
      <div className="step">
        <p className="step-label">
          Select a folder containing sketch files to search within:
        </p>
        <button onClick={this.onClick.bind(this)} className="submit-btn">Browse</button>
      </div>
    )
  }
}
