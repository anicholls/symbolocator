import React from 'react'
import * as utils from '../utils/utils'

// window.require is only defined for electron
const {dialog} = window.require('electron').remote


export default class StepTwo extends React.Component {
  onFolderSelect(paths) {
    // The user closed the modal without selecting a folder
    // TODO: solve this better because it's an endless loop
    if (!paths) {
      this.onClick()
      return
    }

    // Electron only returns the path of the directory
    const dir = paths[0]

    // TODO: Show loading spinner while we find all directories.
    // Disable when on this.props.updateSketchFiles

    this.props.updateDirectoryPath(dir)

    const files = utils.getSketchFilesFromDir(dir)

    this.props.updateSketchFiles(files)

    utils.detectSymbolInFiles(
      this.props.symbolName, files, this.props.onFileRead)
  }

  onClick() {
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }, this.onFolderSelect.bind(this))
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
