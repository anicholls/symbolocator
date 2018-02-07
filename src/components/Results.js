import React from 'react'
import FileList from './FileList'
import MatchedFiles from './MatchedFiles'
import ProgressBar from './ProgressBar'
import SearchInfo from './SearchInfo'
import './Results.css'

export default class Results extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activeTab: 0  // TODO: Enum this
    }
  }

  setActiveTab(tabIndex) {
    this.setState({ activeTab: tabIndex })
  }

  render() {
    if (!this.props.visible) {
      return null
    }

    const percentage = parseInt(
      (this.props.checkCount / this.props.sketchFiles.length), 10)

    return (
      <div className="results">
        <ProgressBar percentage={percentage} />
        <button onClick={this.props.restart}>Restart</button>
        <SearchInfo
          numSketchFiles={this.props.sketchFiles.length}
          checkCount={this.props.checkCount}
          directoryPath={this.props.directoryPath}
          symbolName={this.props.symbolName}
        />
        <MatchedFiles
          percentage={this.props.percentage}
          directoryPath={this.props.directoryPath}
          files={this.props.matches}
        />
        {/* <FileList
          directoryPath={this.props.directoryPath}
          files={this.props.errors}
          header="Parse Errors"
          collapsed={true}
        /> */}
        <FileList
          directoryPath={this.props.directoryPath}
          files={this.props.sketchFiles}
          header="Sketch Files"
          collapsed={true}
        />
      </div>
    )
  }
}
