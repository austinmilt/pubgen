import React from 'react'

export default class RulesElement extends React.Component {

    formatRule(rule) {
        return <li key={rule}>{rule}</li>;
    }

    formatRules(rules) {
        return <ul>{rules.map(this.formatRule)}</ul>;
    }

    render() {
        return <div>
            Rules:
            <div>
                {this.formatRules(this.props.rules)}
            </div>
        </div>;
    }
}