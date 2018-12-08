import React from 'react'
import MinorElement from './_minor-element';
import PropTypes from 'prop-types';


export default class DescriptionElement extends React.Component {

    render() {
        return <MinorElement text={this.props.description}/>
    }
}

DescriptionElement.propTypes = {
    description: PropTypes.string.isRequired,
};