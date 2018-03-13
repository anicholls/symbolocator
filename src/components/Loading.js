import React from 'react';
import './Loading.css'

export default class Loading extends React.Component {
  render() {
    if (!this.props.visible) {
      return null
    }

    return (
      <div className="loading">
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
        <h3>Loading Files...</h3>
      </div>
    )
  }
}
