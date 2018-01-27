import React, { Component } from 'react'
import FileList from './FileList'
import ProgressBar from './ProgressBar'
import RestartButton from './RestartButton'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import * as utils from '../utils/utils'
import logo from '../logo.svg'
import './App.css'

const INITIAL_STATE = {
  symbolName: '',
  searching: false,
  checkCount: 0,
  sketchFiles: [],
  matchedFiles: []
}

class App extends Component {
  constructor(props) {
    super(props);

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
    if (!utils.isElectron()) {
      return (
        <div>Only the electron browser is supported</div>
      )
    }

    const showStepOne = (!this.hasSearched() && !this.state.symbolName)
    const showStepTwo = (!this.hasSearched() && this.state.symbolName)
    const showRestartButton = (this.hasSearched() && this.state.sketchFiles.length > 0)
    const showProgressBar = (this.hasSearched() && this.state.sketchFiles.length > 0)
    const showSketchFiles = (this.hasSearched())
    const showMatchedFiles = (this.hasSearched() && this.state.matchedFiles.length > 0)

    const percentage = this.state.checkCount / this.state.sketchFiles.length

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Symbolocator</h1>
        </header>
        <ProgressBar percentage={percentage} visible={showProgressBar} />
        <StepOne
          onSymbolName={this.onSymbolName.bind(this)}
          visible={showStepOne}
        />
        <StepTwo
          symbolName={this.state.symbolName}
          updateSketchFiles={this.updateSketchFiles.bind(this)}
          onFileRead={this.onFileRead.bind(this)}
          visible={showStepTwo}
        />
        <RestartButton onClick={this.restart.bind(this)} visible={showRestartButton}/>
        <FileList files={this.state.sketchFiles} header="Sketch Files" visible={showSketchFiles} />
        <FileList files={this.state.matchedFiles} header="Matched Files" visible={showMatchedFiles} />
      </div>
    );
  }
}

export default App;
