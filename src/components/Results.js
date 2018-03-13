import React from 'react'
import FileList from './FileList'
import './Results.css'

export default class Results extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activeTab: 'matches'  // TODO: Enum this
    }
  }

  setActiveTab(tabSlug) {
    this.setState({ activeTab: tabSlug })
  }

  render() {
    if (!this.props.visible) {
      return null
    }

    return (
      <div className={`results ${this.state.activeTab}`}>
        <div className="result-tabs">
          <ul className="result-tab-bar">
            <li onClick={this.setActiveTab.bind(this, 'matches')} className="matches">
              Matches ({this.props.matches.length})
            </li>
            <li onClick={this.setActiveTab.bind(this, 'errors')} className="errors">
              Errors ({this.props.errors.length})
            </li>
            <li onClick={this.setActiveTab.bind(this, 'all')} className="all">
              All Files ({this.props.sketchFiles.length})
            </li>
          </ul>
        </div>
        <div className="result-tab-panels">
          <div className="matches">
            <FileList
              directoryPath={this.props.directoryPath}
              files={this.props.matches}
              emptyState="No Matched Files"
            />
          </div>
          <div className="errors">
            <FileList
              directoryPath={this.props.directoryPath}
              files={this.props.errors}
              emptyState="No Parse Errors"
            />
          </div>
          <div className="all">
            <FileList
              directoryPath={this.props.directoryPath}
              files={this.props.sketchFiles}
              emptyState="No sketch files in folder."
            />
          </div>
        </div>
      </div>
    )
  }
}
