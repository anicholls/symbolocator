import React from 'react';

export default class FileList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      collapsed: this.props.collapsed,
      visible: this.props.visible || true
    }
  }

  toggleCollapsed() {
    this.setState({ collapsed: !this.state.collapsed })
  }

  render() {
    if (!this.state.visible) {
      return null
    }

    const numFiles = Object.keys(this.props.files).length

    const toggleIndicator = (this.state.collapsed) ? 'Expand' : 'Collapse'

    return (
      <div className={this.state.collapsed ? 'file-list collapsed' : 'file-list'}>
        <h4 onClick={this.toggleCollapsed.bind(this)}>
          {this.props.header} ({numFiles})
          <span className="collapse-toggle">{toggleIndicator}</span>
        </h4>
        <ul>
          { this.props.files.map((path, index) => {
              const relPath = path.replace(this.props.directoryPath, '')
              return (
                <li key={index}>{ relPath }</li>
              )
          })}
        </ul>
      </div>
    )
  }
}
