import React from 'react';

export default class FileList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: this.props.visible || true
    }
  }

  toggleCollapsed() {
    this.setState({ collapsed: !this.state.collapsed })
  }

  _renderFileList() {
    return (
      <ul>
        { this.props.files.map((path, index) => {
            const relPath = path.replace(this.props.directoryPath, '.')
            const dir = relPath.substring(0, relPath.lastIndexOf("/"));
            const filename = relPath.split('/').pop()
            return (
              <li key={index}>
                {dir}/<strong>{ filename }</strong>
              </li>
            )
        })}
      </ul>
    )
  }

  _renderEmptyState() {
    if (!this.props.emptyState || this.props.files.length) {
      return null
    }

    return (
      <div className="empty-state">
        <h3>{this.props.emptyState}</h3>
      </div>
    )
  }

  render() {
    if (!this.state.visible) {
      return null
    }

    // const numFiles = Object.keys(this.props.files).length
    // const toggleIndicator = (this.state.collapsed) ? 'Expand' : 'Collapse'

    return (
      <div className={this.state.collapsed ? 'file-list collapsed' : 'file-list'}>
        {/*
        <h4 className="file-list-header" onClick={this.toggleCollapsed.bind(this)}>
          {this.props.header} ({numFiles})
          <span className="collapse-toggle">{toggleIndicator}</span>
        </h4>
        */}
        {this._renderFileList()}
        {this._renderEmptyState()}
      </div>
    )
  }
}
