import React from 'react';
import Mode from './_mode';
import PropTypes from 'prop-types';

export default class ModeWithSubmodes extends React.Component {

    chooseRandomMode = () => {
        return this.props.submodes[Math.floor(Math.random()*this.props.submodes.length)];
    }


    concatRules = (baseRules, extraRules) => {
        if ((extraRules !== undefined) && (extraRules.length > 0)) {
            return baseRules.concat(extraRules);
        }
        else {
            return baseRules;
        }
    }


    render() {
        const params = this.chooseRandomMode();
        return <Mode 
            displayName={this.props.displayName + ": " + params.displayName} 
            description={this.props.description + " " + params.description}
            rules={this.concatRules(this.props.rules, params.rules)}
        />;
    }

}

ModeWithSubmodes.propTypes = {
    displayName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rules: PropTypes.arrayOf(PropTypes.string).isRequired,
    submodes: PropTypes.any // change to array of something
};