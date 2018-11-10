import React from 'react';
import Button from './button';

export default class RandomizeButton extends React.Component {

    render() {
        return <Button buttonText="Hit It!" onClick={this.props.onClick}/>
    }
}