import React, { Component } from 'react'
import Header from './Header'
import Results from './Results'
import Loading from './Loading'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import './App.css'


const {ipcRenderer} = window.require('electron')

const INITIAL_STATE = {
  symbolName: '',
  deep: false,
  loading: false,
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

  componentDidMount() {
    ipcRenderer.on('results', (event, results) => {
      this.setState({
        results,
        loading: false
      })
    })
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

  setPath(path) {
    ipcRenderer.send('search', {
      path: path,
      symbolName: this.state.symbolName,
      deep: this.state.deep
    })
    this.setState({ loading: true })
  }

  // Add logic to check for files & hide loading spinner
  // Set directory path and show loading spinner while we read the dir

  // TODO: Once we have a list of sketch files, resize window to display
  // https://discuss.atom.io/t/how-to-re-size-electron-main-window-dynamically/48183

  // TODO: Make this stop parsing sketch files
  restart() {
    this.setState(INITIAL_STATE)
  }

  render() {
    const showStepOne = (!this._getCheckedCount() && !this.state.symbolName && !this.state.loading)
    const showStepTwo = (!this._getCheckedCount() && this.state.symbolName && !this.state.loading)
    const showSpinner = (this.state.loading)

    return (
      <div className="symbolocator">
        <Header
          fileCount={this.state.results.sketchFiles.length}
          checkCount={this._getCheckedCount()}
          directoryPath={this.state.results.path}
          symbolName={this.state.symbolName}
          restart={this.restart.bind(this)}
        />
        <StepOne
          setSymbolName={this.setSymbolName.bind(this)}
          setDeepSearch={this.setDeepSearch.bind(this)}
          visible={showStepOne}
        />
        <StepTwo
          symbolName={this.state.symbolName}
          deep={this.state.deep}
          setPath={this.setPath.bind(this)}
          visible={showStepTwo}
        />
        <Loading
          visible={showSpinner}
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
