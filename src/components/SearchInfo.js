import React from 'react';

export default class SearchInfo extends React.Component {
  render() {
    if (!this.props.visible) {
      return null
    }

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
