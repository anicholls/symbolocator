import React, { Component } from 'react'
import Results from './Results'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import { isElectron } from '../utils/utils'
import logo from '../logo.svg'
import './App.css'

const INITIAL_STATE = {
  symbolName: '',
  directoryPath: '',
  loadingDirectory: false,
  searching: false,
  checkCount: 0,
  sketchFiles: [],
  matchedFiles: []
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = INITIAL_STATE
  }

  hasSearched() {
    return (this.state.searching || this.state.sketchFiles.length)
  }

  onSymbolName(symbolName) {
    this.setState({ symbolName })
  }

  updateDirectoryPath(directoryPath) {
    // Set directory path and show loading spinner while we read the dir
    this.setState({ directoryPath, loadingDirectory: true })
  }

  updateSketchFiles(sketchFiles) {
    // Set sketch files & hide loading spinner
    this.setState({ sketchFiles, loadingDirectory: false })

    // TODO: Once we have a list of sketch files, resize window to display
    // https://discuss.atom.io/t/how-to-re-size-electron-main-window-dynamically/48183
  }

  onFileRead(file, detected) {
    const checkCount = this.state.checkCount + 1
    let searching = this.state.searching

    // Last file has been read
    if (checkCount === this.state.sketchFiles.length - 1) {
      searching = false
    }

    if (detected) {
      this.setState({
        checkCount,
        searching,
        matchedFiles: this.state.matchedFiles.concat(file)
      })
    }
    else {
      this.setState({ checkCount, searching })
    }
  }

  restart() {
    this.setState(INITIAL_STATE)
  }

  render() {
    if (!isElectron()) {
      return (
        <div>Only the electron browser is supported</div>
      )
    }

    const showStepOne = (!this.hasSearched() && !this.state.symbolName)
    const showStepTwo = (!this.hasSearched() && this.state.symbolName)

    return (
      <div className="symbolocator">
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <h1 className="title">Symbolocator</h1>
        </header>
        <StepOne
          onSymbolName={this.onSymbolName.bind(this)}
          visible={showStepOne}
        />
        <StepTwo
          symbolName={this.state.symbolName}
          updateDirectoryPath={this.updateDirectoryPath.bind(this)}
          updateSketchFiles={this.updateSketchFiles.bind(this)}
          onFileRead={this.onFileRead.bind(this)}
          visible={showStepTwo}
        />
        <Results
          directoryPath={this.state.directoryPath}
          sketchFiles={this.state.sketchFiles}
          matches={this.state.matchedFiles}
          checkCount={this.state.checkCount}
          symbolName={this.state.symbolName}
          restart={this.restart.bind(this)}
          visible={this.hasSearched()}
        />
      </div>
    );
  }
}

export default App;
