import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sketchFiles: {}
    }
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

    this.setState({ sketchFiles: sketchFiles })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="file" onChange={this.onFileChange.bind(this)} webkitdirectory="true" directory="true" multiple="true" />
        <ul>
          { Object.keys(this.state.sketchFiles).map((path, index) => {
              const file = this.state.sketchFiles[path]

              return (
                <li key={index}>{ file.webkitRelativePath }</li>
              )
          })}
        </ul>
      </div>
    );
  }
}

export default App;
