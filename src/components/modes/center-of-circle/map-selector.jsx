import React from 'react';
import PropTypes from 'prop-types';
import MapChoice from './map-choice';

export default class MapSelector extends React.Component {

    constructChoice = (key, backgroundImage, onClick) => {
        return <MapChoice 
            key={key}
            backgroundImage={backgroundImage}
            onClick={onClick}
            width={this.props.width}
            height={this.props.height}
        />;
    }


    constructChoices = () => {
        let choices = [];
        for (let choiceParams of this.props.choices) {
            let bg = choiceParams.backgroundImage;
            let onClick = () => {this.props.onClick(choiceParams.key);}
            choices.push(this.constructChoice(choiceParams.key, bg, onClick));
        }
        return choices;
    }


    render() {
        return <div>{this.constructChoices()}</div>;
    }
}

MapSelector.propTypes = {
    choices: PropTypes.arrayOf(PropTypes.shape({
        backgroundImage: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired 
    })).isRequired,
    onClick: PropTypes.func.isRequired
};