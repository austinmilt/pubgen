import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MinorElementStyle = styled.h1`
    color: white;
    font-size: 2em;
    font-weight: normal;
    font-family: 'Chakra Petch', sans-serif;
`;

export default class MinorElement extends React.Component {
  
  render() {
    return <MinorElementStyle>{this.props.text}</MinorElementStyle>;
  }

}

MinorElement.propTypes = {
    text: PropTypes.string
};
