import React from 'react';
import FileList from './FileList'

export default class MatchedFiles extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: this.props.visible || true
    }
  }

  render() {
    if (!this.state.visible) {
      return null
    }

    var noMatches

    if (this.props.percentage === 1 && !this.props.files.length) {
      noMatches = (
        <div>No matches found</div>
      )
    }

    return (
      <div>
        <FileList
          directoryPath={this.props.directoryPath}
          files={this.props.files}
          header="Matched Files"
        />
        { noMatches }
      </div>
    )
  }
}
