import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.Component {

  render() {
    return <button onClick={this.props.onClick}>{this.props.buttonText}</button>;
  }

}

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};