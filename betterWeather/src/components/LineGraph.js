import React, { useRef, useContext, useState } from 'react'
import styled from 'styled-components';
import Button from './styled/button'
import useGraph from '../hooks/useGraph'
import { MainContext } from '../contexts/MainContext'

const Graph = () => {

    const {
        epoch,
        setEpoch,
        foreCastObject,
        selection
    } = useContext(MainContext)
    const graphRef = useRef()
    const [graph, range, setRange] = useGraph(graphRef)
    const [rangeWidth, setrangeWidth] = useState(1)
    //note to self : rangeWidth sould always be an even integer as the hourly forCast provides 48 timestamp and the daily provides 8.

    const { parsedLabels } = foreCastObject.arrays

    const changeRange = (incrVal) => {

        const lenght = foreCastObject.arrays.parsedData[selection].data.length
        console.log("changeRange -> foreCastObject", foreCastObject)
        console.log("changeRange -> lenght", lenght)
        const bool = range[0] + incrVal < 0 || range[1] + incrVal > lenght
        
        if (!bool) {
            console.log('happens');
            setRange([range[0] + incrVal, range[1] + incrVal])
        }
    }
    

    return(
        <GraphWrapper>
            <ActualCanvas ref={graphRef}/>
            <Controls>
                <ArrowButton onClick={() => {changeRange(-rangeWidth)}}>
                    {`< ${rangeWidth} h`}
                </ArrowButton>

                <div>
                    {parsedLabels[range[0]]} to {parsedLabels[range[1]]}
                </div>

                <ArrowButton onClick={() => {changeRange(rangeWidth)}}>
                    {`${rangeWidth} h >`}
                </ArrowButton>
            </Controls>
        </GraphWrapper>
    )
}

const GraphWrapper = styled.div`
    margin-top: 15px;
  position: relative;
  grid-area: graph;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;

`;

const ActualCanvas = styled.canvas`
    width: 100%;
`;

const Controls = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 2.5rem;
    background-color: var(--grey);
    color: white;
`;

const ArrowButton = styled(Button)`
    padding: 0 1rem 0 1rem;
    margin: 0;
    font-size: 130%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
`;


export default Graph
