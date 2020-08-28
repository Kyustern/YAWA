import React, {useEffect} from 'react';
import styled from 'styled-components';
//Components
import Header from './components/Header'
import Main from './components/Main'

import { MainProvider } from './contexts/MainContext'

//sc
const AppWrapper = styled.div`
    font-family: 'Nanum Gothic', sans-serif;
    height: 100%;
`;

const App = () => {

    return (
        <AppWrapper>
            <MainProvider>
                <Header></Header>
                <Main></Main>
            </MainProvider>
        </AppWrapper>
    );
}

export default App;
