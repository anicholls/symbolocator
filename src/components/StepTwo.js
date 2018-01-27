import React from 'react';
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

    // Get Recursively get the path of all the files in a folder.
    const files = utils.getSketchFilesFromDir(dir)

    // Update app state sketchFiles
    this.props.updateSketchFiles(files)

    // TODO: Use async library to limit file parsing
    // https://stackoverflow.com/questions/9539886/limiting-asynchronous-calls-in-node-js
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
        <p className="App-intro">
          Select the folder you would like to search within
        </p>
        <button onClick={this.onClick.bind(this)}>Select Folder</button>
      </div>
    )
  }
}
