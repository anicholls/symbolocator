import React, { Component } from 'react';
import FileList from './FileList'
import RestartButton from './RestartButton'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import detectSymbol from './detectSymbol'
import logo from './logo.svg';
import './App.css';

const SKETCH_FILE = '../test/test.sketch';

const INITIAL_STATE = {
  symbolName: '',
  located: false,
  sketchFiles: {},
  matchedFiles: {}
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE
  }

  getNumSketchFiles() {
    return Object.keys(this.state.sketchFiles).length
  }

  getNumMatchedFiles() {
    return Object.keys(this.state.matchedFiles).length
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
      located: false,
      sketchFiles: sketchFiles,
      matchedFiles: {}
    }, this.locateSymbol)
  }

  addMatch(file) {
    const matchedFiles = this.state.matchedFiles
    matchedFiles[file.path] = file

    this.setState({
      located: true,
      matchedFiles: matchedFiles
    })
  }

  locateSymbol() {
    const matchedFiles = {}

    Object.keys(this.state.sketchFiles).forEach(path => {
      const file = this.state.sketchFiles[path]
      const detected = detectSymbol(file, this.state.symbolName, this.addMatch.bind(this))

      if (detected) {
        matchedFiles[path] = file
      }
    })
  }

  onStepOneSubmit(e) {
    const input = e.target.elements[0]

    this.setState({ symbolName: input.value })
  }

  restart() {
    this.setState(INITIAL_STATE)
  }

  render() {
    const showStepOne = (!this.state.located && !this.state.symbolName)
    const showStepTwo = (!this.state.located && this.state.symbolName && !this.getNumSketchFiles())
    const showRestartButton = (this.getNumSketchFiles() > 0)
    const showSketchFiles = (this.getNumSketchFiles() > 0)
    const showMatchedFiles = (this.state.located && this.getNumMatchedFiles() > 0)

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Symbolocator</h1>
        </header>
        <StepOne onSubmit={this.onStepOneSubmit.bind(this)} visible={showStepOne} />
        <StepTwo onFileChange={this.onFileChange.bind(this)} visible={showStepTwo} />
        <RestartButton onClick={this.restart.bind(this)} visible={showRestartButton}/>
        <FileList files={this.state.sketchFiles} header="Sketch Files" visible={showSketchFiles} />
        <FileList files={this.state.matchedFiles} header="Matched Files" visible={showMatchedFiles} />
      </div>
    );
  }
}

export default App;
