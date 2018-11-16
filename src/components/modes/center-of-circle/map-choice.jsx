import React from 'react';
import PropTypes from 'prop-types';
import './center-of-circle.css';


export default class MapChoice extends React.Component {

    render() {
        return <img 
            src={this.props.backgroundImage}
            alt="Background (missing)"
            height={this.props.height} 
            width={this.props.width}
            onClick={this.props.onClick}
            className="mapChoice"
        />;
    }
}

MapChoice.propTypes = {
    backgroundImage: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};