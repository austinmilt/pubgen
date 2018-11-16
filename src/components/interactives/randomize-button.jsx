import React from 'react';
import Button from './button';
import PropTypes from 'prop-types';

export default class RandomizeButton extends React.Component {

    render() {
        return <Button buttonText="Hit It!" onClick={this.props.onClick}/>
    }
}

RandomizeButton.propTypes = {
    onClick: PropTypes.func.isRequired
};