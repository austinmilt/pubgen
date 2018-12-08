import React from 'react'
import Randomizer from '../components/randomizer';
import styled from 'styled-components';

const PageStyle = styled.div`
    background-color: #0a0d1d;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-family: 'Chakra Petch', sans-serif;
    color: white;
`;

const IndexPage = () => (
    <div>
        <link href="https://fonts.googleapis.com/css?family=Chakra+Petch" rel="stylesheet"></link>
        <PageStyle>
            <Randomizer/>
        </PageStyle>
    </div>
)

export default IndexPage
