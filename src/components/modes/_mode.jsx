import React from 'react'
import PropTypes from 'prop-types';
import DisplayNameElement from '../elements/display-name';
import DescriptionElement from '../elements/description';
import RulesElement from '../elements/rules';

export default class Mode extends React.Component {

    render() {
        return <div>
            <DisplayNameElement name={this.props.displayName}/>
            <DescriptionElement description={this.props.description}/>
            <RulesElement rules={this.props.rules}/>
            {this.props.advancedFeature}
        </div>;
    }
}

Mode.propTypes = {
    displayName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rules: PropTypes.arrayOf(PropTypes.string).isRequired,
    advancedFeature: PropTypes.any
};