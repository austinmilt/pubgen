import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListStyled = styled.ul`
   list-style: none;
   margin-left: 0;
   padding-left: 1em;
   text-indent: -1em;
`;

const ListElementStyled = styled.li`
    ::before { content: '∵ '; }
`;



export default class RulesElement extends React.Component {

    formatRule(rule) {
        return <ListElementStyled key={rule}>{rule}</ListElementStyled>;
    }

    formatRules(rules) {
        return <ListStyled>{rules.map(this.formatRule)}</ListStyled>;
    }

    render() {
        return this.formatRules(this.props.rules);
    }
}

RulesElement.propTypes = {
    rules: PropTypes.arrayOf(PropTypes.string).isRequired,
};