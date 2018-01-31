import React from 'react'
import CircularProgressBar from './CircularProgressBar'
import FileList from './FileList'
import MatchedFiles from './MatchedFiles'
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
      (this.props.checkCount / this.props.sketchFiles.length * 100), 10)
    const resultsClass = (this.state.activeTab === 0) ?
      'results progress' : 'results matches'

    return (
      <div className={ resultsClass }>
        <ul className="result-tab-bar">
          <li onClick={this.setActiveTab.bind(this, 0)} className="progress">Progress</li>
          <li onClick={this.setActiveTab.bind(this, 1)} className="matches">Matches ({this.props.matches.length})</li>
        </ul>
        <div className="result-tab-panels">
          <div className="progress">
            <CircularProgressBar
              strokeWidth="4"
              sqSize="200"
              percentage={percentage}
              subtext={ `${this.props.checkCount} / ${this.props.sketchFiles.length}` }
            />
            <button onClick={this.props.restart}>Restart</button>
            <SearchInfo
              numSketchFiles={this.props.sketchFiles.length}
              checkCount={this.props.checkCount}
              directoryPath={this.props.directoryPath}
              symbolName={this.props.symbolName}
            />
          </div>
          <div className="matches">
            <MatchedFiles
              percentage={this.props.percentage}
              directoryPath={this.props.directoryPath}
              files={this.props.matches}
            />
            <FileList
              directoryPath={this.props.directoryPath}
              files={this.props.sketchFiles}
              header="Sketch Files"
              collapsed={true}
            />
          </div>
        </div>
      </div>
    )
  }
}
