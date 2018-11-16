import React from 'react'
import MinorElement from './_minor-element'
import PropTypes from 'prop-types';

const style={color: 'blue'};

export default class DisplayNameElement extends React.Component {

    render() {
        return <div>
            Display Name: <MinorElement text={this.props.name} style={style}/>
        </div>
    }
}

DisplayNameElement.propTypes = {
    name: PropTypes.string.isRequired,
};