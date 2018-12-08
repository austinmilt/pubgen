import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MapChoice from './map-choice';

const ChoicesContainerStyle = styled.div`
    width: ${props => props.width}px;
    max-width: ${props => props.width}px;
    height: ${props => props.height}px;
`;

const ChoiceContainerStyle = styled.div`
    width: 100%;
    height: 20%;
    display: inline-block;
    overflow: hidden;
    transition: all 1s ease;

    :hover {
        height: 100%;
        cursor: pointer;
    }
`;

export default class MapSelector extends React.Component {

    constructChoice = (key, backgroundImage, onClick) => {
        return <ChoiceContainerStyle key={key}>
            <MapChoice 
                backgroundImage={backgroundImage}
                onClick={onClick}
            />
        </ChoiceContainerStyle>;
    }


    constructChoices = () => {
        let choices = [];
        for (let i = 0; i < this.props.choices.length; i++) {
            let choiceParams = this.props.choices[i];
            let bg = choiceParams.backgroundImage;
            let onClick = () => {this.props.onClick(choiceParams.key);}
            choices.push(this.constructChoice(choiceParams.key, bg, onClick));
        }
        return choices;
    }


    render() {
        return <ChoicesContainerStyle width={this.props.width} height={this.props.height}>{this.constructChoices()}</ChoicesContainerStyle>;
    }
}

MapSelector.propTypes = {
    choices: PropTypes.arrayOf(PropTypes.shape({
        backgroundImage: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired 
    })).isRequired,
    onClick: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};