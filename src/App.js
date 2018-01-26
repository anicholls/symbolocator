import React, { Component } from 'react'
import FileList from './FileList'
import ProgressBar from './ProgressBar'
import RestartButton from './RestartButton'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import detectSymbol from './detectSymbol'
import logo from './logo.svg'
import './App.css'

const INITIAL_STATE = {
  symbolName: '',
  searching: false,
  checkCount: 0,
  sketchFiles: {},
  matchedFiles: {}
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE

    this.isElectron = false
    var userAgent = navigator.userAgent.toLowerCase()
    if (userAgent.indexOf(' electron/') > -1) {
      this.isElectron = true
    }
  }

  getNumSketchFiles() {
    return Object.keys(this.state.sketchFiles).length
  }

  getNumMatchedFiles() {
    return Object.keys(this.state.matchedFiles).length
  }

  hasSearched() {
    return (this.state.searching || this.getNumSketchFiles())
  }

  onFileChange(e) {
    const files = Array.from(e.target.files)

    const sketchFiles = {}

    files.forEach(file => {
      const extension = file.name.split('.').pop()

      if (extension === 'sketch') {
        sketchFiles[file.webkitRelativePath] = file
      }
    }, this)

    this.setState({
      searching: true,
      sketchFiles: sketchFiles,
      matchedFiles: {}
    }, this.locateSymbol)
  }

  fileRead(file, detected) {
    const checkCount = this.state.checkCount + 1
    let searching = this.state.searching

    // Last file has been read
    if (checkCount === this.getNumSketchFiles() - 1) {
      searching = false
    }
    this.setState({ checkCount, searching })

    if (detected) {
      const matchedFiles = this.state.matchedFiles
      matchedFiles[file.webkitRelativePath] = file

      this.setState({ matchedFiles: matchedFiles })
    }
  }

  locateSymbol() {
    const matchedFiles = {}

    Object.keys(this.state.sketchFiles).forEach((path, index) => {
      const file = this.state.sketchFiles[path]
      const detected = detectSymbol(file, this.state.symbolName,
          this.fileRead.bind(this))

      if (detected) {
        matchedFiles[path] = file
      }
    }, this)
  }

  onStepOneSubmit(e) {
    const input = e.target.elements[0]

    this.setState({ symbolName: input.value })
  }

  restart() {
    this.setState(INITIAL_STATE)
  }

  render() {
    const showStepOne = (!this.hasSearched() && !this.state.symbolName)
    const showStepTwo = (!this.hasSearched() && this.state.symbolName)
    const showRestartButton = (this.hasSearched() && this.getNumSketchFiles() > 0)
    const showProgressBar = (this.hasSearched() && this.getNumSketchFiles() > 0)
    const showSketchFiles = (this.hasSearched())
    const showMatchedFiles = (this.hasSearched() && this.getNumMatchedFiles() > 0)

    const percentage = this.state.checkCount / this.getNumSketchFiles()

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Symbolocator</h1>
        </header>
        <ProgressBar percentage={percentage} visible={showProgressBar} />
        <StepOne onSubmit={this.onStepOneSubmit.bind(this)} visible={showStepOne} />
        <StepTwo onFileChange={this.onFileChange.bind(this)} visible={showStepTwo} isElectron={this.isElectron} />
        <RestartButton onClick={this.restart.bind(this)} visible={showRestartButton}/>
        <FileList files={this.state.sketchFiles} header="Sketch Files" visible={showSketchFiles} />
        <FileList files={this.state.matchedFiles} header="Matched Files" visible={showMatchedFiles} />
      </div>
    );
  }
}

export default App;
