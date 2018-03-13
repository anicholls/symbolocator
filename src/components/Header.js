import React from 'react'
import CircularProgressBar from './CircularProgressBar'
import logo from '../logo.svg'
import './Header.css'

export default class Header extends React.Component {
  render() {
    const percentage = this.props.checkCount / this.props.fileCount
    let contents

    if (this.props.checkCount) {
      contents = (
        <div>
          <CircularProgressBar
            sqSize={160}
            strokeWidth={4}
            percentage={percentage}
            subtext={`${this.props.checkCount} / ${this.props.fileCount}`}
          />
          <div className="symbol-name" onClick={this.props.restart}>
            <span className="restart">X</span>
            { this.props.symbolName }
          </div>
          <div className="directory-path">
            <strong>Searching in:</strong> {this.props.directoryPath}
          </div>
        </div>
      )
    }
    else {
      contents = (
        <div>
          <img src={logo} className="logo" alt="logo" />
          <h1 className="title">Symbolocator</h1>
        </div>
      )
    }

    return (
      <header className="header">
        {contents}
      </header>
    )
  }
}
