import React, { useContext } from 'react'
import styled from 'styled-components';

import Nav from './Nav'
import LineGraph from './LineGraph'
import { MainContext } from '../contexts/MainContext'

const Wrapper = styled.div`
    height: auto;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: 1fr;
    grid-template-areas: "misc graph";
    color: white;
    @media (max-width: 900px) {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 4fr;
        grid-template-areas: "misc" "graph";
    }
`;


const Loader = styled.div`
    margin: auto;
    font-size: 220%;
`;


const Main = () => {

    const {
        foreCastObject,
        selection
    } = useContext(MainContext)

    return (
        <>
            {
                !foreCastObject ?
                    <Loader>/Loading/</Loader>
                    :
                    <Wrapper>
                        <LineGraph className="graph" selection={selection} />
                        <Nav className="misc" />
                    </Wrapper>
            }
        </>

    )
}

export default Main