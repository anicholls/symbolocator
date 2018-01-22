import React from 'react';

export default class FileList extends React.Component {
  render() {
    return (
      <div>
        <h4>{this.props.header}:</h4>
        <ul>
          { Object.keys(this.props.files).map((path, index) => {
              const file = this.props.files[path]

              return (
                <li key={index}>{ file.webkitRelativePath }</li>
              )
          })}
        </ul>
      </div>
    )
  }
}
