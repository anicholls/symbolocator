import React, { Component } from 'react'
import FileList from './FileList'
import MatchedFiles from './MatchedFiles'
import ProgressBar from './ProgressBar'
import RestartButton from './RestartButton'
import SearchInfo from './SearchInfo'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import { isElectron } from '../utils/utils'
import logo from '../logo.svg'
import './App.css'

const INITIAL_STATE = {
  symbolName: '',
  directoryPath: '',
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

  updateSketchFiles(sketchFiles) {
    this.setState({ sketchFiles })

    // TODO: Once we have a list of sketch files, resize window to display
    // https://discuss.atom.io/t/how-to-re-size-electron-main-window-dynamically/48183
  }

  updateDirectoryPath(directoryPath) {
    this.setState({ directoryPath })
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
    const showRestartButton = (this.hasSearched() && this.state.sketchFiles.length > 0)
    const showProgressBar = (this.hasSearched() && this.state.sketchFiles.length > 0)

    const percentage = this.state.checkCount / this.state.sketchFiles.length

    return (
      <div className="symbolocator">
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <h1 className="title">Symbolocator</h1>
        </header>
        <ProgressBar percentage={percentage} visible={showProgressBar} />
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
        <RestartButton
          onClick={this.restart.bind(this)}
          visible={showRestartButton}
        />
        <SearchInfo
          directoryPath={this.state.directoryPath}
          symbolName={this.state.symbolName}
          visible={this.hasSearched()}
        />
        <FileList
          directoryPath={this.state.directoryPath}
          files={this.state.sketchFiles}
          header="Sketch Files"
          visible={this.hasSearched()}
          collapsed={true}
        />
        <MatchedFiles
          percentage={percentage}
          directoryPath={this.state.directoryPath}
          files={this.state.matchedFiles}
          header="Sketch Files"
          visible={this.hasSearched()}
        />
      </div>
    );
  }
}

export default App;
