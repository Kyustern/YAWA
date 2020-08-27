import React from 'react'
import styled from 'styled-components'
import Loader from './Loader'

const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0,0,0,0.5);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    background-color: white;
    width: 90%;
    height: 90%;
    border-radius: 10px;
`

const Map = () => {
    return(
        <Background>
            <Wrapper>
                <Loader/>
            </Wrapper>
        </Background>
    )
}

export default Map