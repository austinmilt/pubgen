import React from 'react'
import PropTypes from 'prop-types';
import style from 'styled-components';

// export default MinorElement`
    
// `;


export default class MinorElement extends React.Component {
  
  render() {
    return <h1 style={this.props.style}>{this.props.text}</h1>;
  }

}

MinorElement.propTypes = {
    style: PropTypes.object,
    text: PropTypes.string
};
