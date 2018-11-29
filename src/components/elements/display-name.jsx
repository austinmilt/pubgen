import React from 'react'
import MinorElement from './_minor-element'
import PropTypes from 'prop-types';

export default class DisplayNameElement extends React.Component {

    render() {
        return <div>
            Display Name: <MinorElement text={this.props.name} style={this.props.style}/>
        </div>
    }
}

DisplayNameElement.propTypes = {
    name: PropTypes.string.isRequired,
    style: PropTypes.object
};