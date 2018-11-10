import React from 'react'
import DisplayNameElement from '../elements/display-name';
import DescriptionElement from '../elements/description';
import RulesElement from '../elements/rules';
import { isArray } from 'util';

export default class Mode extends React.Component {

    constructor(props) {
        super(props);
        this.validateProps();
    }


    validateProps = () => {
        if (this.props.displayName === undefined) {
            throw new Error("Parameter 'displayName' is required for Mode.");
        }
        if (this.props.description === undefined) {
            throw new Error("Parameter 'description' is required for Mode.");
        }
        if (this.props.rules === undefined) {
            throw new Error("Parameter 'rules' is required for Mode.");
        }
        if (!isArray(this.props.rules)) {
            throw new Error("Parameter 'rules' must be an array.");
        }
    }


    render() {
        return <div>
            <DisplayNameElement name={this.props.displayName}/>
            <DescriptionElement description={this.props.description}/>
            <RulesElement rules={this.props.rules}/>
            {this.props.advancedFeature}
        </div>;
    }
}