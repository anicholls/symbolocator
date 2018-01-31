import React from 'react';

export default class SearchInfo extends React.Component {
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

    const percentage = parseInt(this.props.checkCount / this.props.numSketchFiles * 100)

    return (
      <ul className="search-info">
        <li>
          Searching for:&nbsp;
          <span className="value">{this.props.symbolName}</span>
        </li>
        <li>
          Searching within:&nbsp;
          <span className="value">{this.props.directoryPath}</span>
        </li>
      </ul>
    )
  }
}
