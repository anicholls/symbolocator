import React from 'react'

// window.require is only defined for electron
const {remote} = window.require('electron')
const detectSymbolInPath = remote.require('symbolocator-cli')

export default class StepTwo extends React.Component {
  _onFolderSelect(paths) {
    // The user closed the modal without selecting a folder
    // TODO: solve this better because it's an endless loop
    if (!paths) {
      this.onClick()
      return
    }

    // Electron only returns the path of the directory
    const dir = paths[0]

    detectSymbolInPath(dir, this.props.symbolName, this.props.deep, this.props.updateResults)
      .then(result => {
        this.props.setResults(result)
      })
      .catch(err => { throw err })
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
