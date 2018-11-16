import React from 'react'
import PropTypes from 'prop-types';

export default class MinorElement extends React.Component {

  render() {
    return <h1 style={this.props.style}>{this.props.text}</h1>;
  }

}

MinorElement.propTypes = {
  style: PropTypes.any,
  text: PropTypes.string
};
