import React from 'react';
import PropTypes from 'prop-types';
// import './center-of-circle.css';


const DEFAULT_STYLE =  {
    background: '#46BAAF',
    border: '3px solid black'
};

const HOVER_ANIMATION = {
    transform: 'scale(1.25)',
    transitionDuration: '300ms'
}


export default class MapChoice extends React.Component {

    render() {
        return <img 
            src={this.props.backgroundImage}
            alt="Background (missing)"
            height={this.props.height} 
            width={this.props.width}
            onClick={this.props.onClick}
            className="coc-map-choice"
            style = {DEFAULT_STYLE}
        />;
    }
}

MapChoice.propTypes = {
    backgroundImage: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};