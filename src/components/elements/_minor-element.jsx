import React from 'react'

export default class MinorElement extends React.Component {

  render() {
    return <h1 style={this.props.style}>{this.props.text}</h1>;
  }

}
