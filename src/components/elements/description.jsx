import React from 'react'
import MinorElement from './_minor-element';
import PropTypes from 'prop-types';

const style={color: 'green'};

export default class DescriptionElement extends React.Component {

    render() {
        
        return <div>
            Description: <MinorElement text={this.props.description} style={style}/>
        </div>
    }
}

DescriptionElement.propTypes = {
    description: PropTypes.string.isRequired,
};