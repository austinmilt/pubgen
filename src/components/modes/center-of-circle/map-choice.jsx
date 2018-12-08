import React from 'react';
import PropTypes from 'prop-types';

export default class MapChoice extends React.Component {

    render() {
        return <img
            src={this.props.backgroundImage}
            alt="Background (missing)"
            onClick={this.props.onClick}
        />;
    }
}

MapChoice.propTypes = {
    backgroundImage: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};