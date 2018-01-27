import React from 'react';

export default class FileList extends React.Component {
  render() {
    if (!this.props.visible) {
      return null
    }

    const numFiles = Object.keys(this.props.files).length

    return (
      <div>
        <h4>{this.props.header} ({numFiles}):</h4>
        <ul>
          { this.props.files.map((path, index) => {
              return (
                <li key={index}>{ path }</li>
              )
          })}
        </ul>
      </div>
    )
  }
}
