import React, { Component } from 'react'
import Results from './Results'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import logo from '../logo.svg'
import './App.css'

const INITIAL_STATE = {
  symbolName: '',
  deep: false,
  results: {
    path: '',
    symbolName: '',
    sketchFiles: [],
    searchedFiles: [],
    errors: []
  }
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = INITIAL_STATE
  }

  _getNumSketchFiles() {
    return this.state.results.sketchFiles.length
  }

  _getCheckedCount() {
    return this.state.results.searchedFiles.length + this.state.results.errors.length
  }

  _getMatchedFiles() {
    let matches = []

    for(let file of this.state.results.searchedFiles) {
      if (file.matched) {
        matches.push(file.path)
      }
    }

    return matches
  }

  setSymbolName(symbolName) {
    this.setState({ symbolName })
  }

  setDeepSearch(deep) {
    this.setState({ deep })
  }

  setResults(results) {
    // Add logic to check for files & hide loading spinner
    // Set directory path and show loading spinner while we read the dir
    this.setState({ results })

    // TODO: Once we have a list of sketch files, resize window to display
    // https://discuss.atom.io/t/how-to-re-size-electron-main-window-dynamically/48183
  }

  // TODO: Make this stop parsing sketch files
  restart() {
    this.setState(INITIAL_STATE)
  }

  render() {
    const showStepOne = (!this._getCheckedCount() && !this.state.symbolName)
    const showStepTwo = (!this._getCheckedCount() && this.state.symbolName)

    return (
      <div className="symbolocator">
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <h1 className="title">Symbolocator</h1>
        </header>
        <StepOne
          setSymbolName={this.setSymbolName.bind(this)}
          setDeepSearch={this.setDeepSearch.bind(this)}
          visible={showStepOne}
        />
        <StepTwo
          symbolName={this.state.symbolName}
          deep={this.state.deep}
          setResults={this.setResults.bind(this)}
          visible={showStepTwo}
        />
        <Results
          symbolName={this.state.symbolName}
          directoryPath={this.state.results.path}
          sketchFiles={this.state.results.sketchFiles}
          errors={this.state.results.errors}
          matches={this._getMatchedFiles()}
          checkCount={this._getCheckedCount()}
          restart={this.restart.bind(this)}
          visible={this._getCheckedCount()}
        />
      </div>
    );
  }
}

export default App;
