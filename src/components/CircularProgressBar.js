import React from 'react'
import './CircularProgressBar.css'

export default class CircularProgressBar extends React.Component {
  render() {
    const percentage = this.props.percentage * 100

    // Size of the enclosing square
    const sqSize = this.props.sqSize
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (this.props.sqSize - this.props.strokeWidth) / 2
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - dashArray * percentage / 100

    return (
      <div className="circular-progress-bar">
        <svg
          width={this.props.sqSize}
          height={this.props.sqSize}
          viewBox={viewBox}>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#EE6C01"/>
              <stop offset="100%" stopColor="#FECD18"/>
            </linearGradient>
          </defs>
          <circle
            className="circle-background"
            cx={this.props.sqSize / 2}
            cy={this.props.sqSize / 2}
            r={radius}
            strokeWidth={`${this.props.strokeWidth}px`} />
          <circle
            className="circle-progress"
            cx={this.props.sqSize / 2}
            cy={this.props.sqSize / 2}
            r={radius}
            strokeWidth={`${this.props.strokeWidth}px`}
            // Start progress marker at 12 O'Clock
            transform={`rotate(-90 ${this.props.sqSize / 2} ${this.props.sqSize / 2})`}
            style={{
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset
            }}
            stroke="url(#gradient)" />
        </svg>
        <div className="progress-info">
          <div className="percentage">{parseInt(percentage, 10)}%</div>
          <div className="subtext">{this.props.subtext}</div>
        </div>
      </div>
    );
  }
}

CircularProgressBar.defaultProps = {
  sqSize: 200,
  percentage: 25,
  strokeWidth: 10
}
