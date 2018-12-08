import React from 'react'
import MinorElement from './_minor-element'
import PropTypes from 'prop-types';

export default class DisplayNameElement extends React.Component {

    render() {
        return <MinorElement text={this.props.name}/>
    }
}

DisplayNameElement.propTypes = {
    name: PropTypes.string.isRequired,
};