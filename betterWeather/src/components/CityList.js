import React, { useContext } from 'react'
import styled from 'styled-components';

import { MainContext } from '../contexts/MainContext'
import Button from './styled/button'

const Wrapper = styled.div`
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

const Content = styled.div`
    background-color: whitesmoke;
    height: 80%;
    width: 70%;
    border-radius: 25px;
    overflow-y: scroll;

    @media (max-width: 800px) {
        width: 90%;
        height: 90%;
    }
`

const ListItem = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 100%;
    height: 3rem;
    border-bottom: 2px solid black;
`

const ClickableListItem = styled(ListItem)`
    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: cubic-bezier(.26,.54,.38,1);
    /* border-radius: 24px 24px 0 0; */

    ${this}:hover {
        color: var(--secondary-background);
        background-color: var(--main-background);
        border-bottom: solid #1878d6 2px;
        cursor: pointer;
    }
`

const ErrorMessage = styled.div`
    background-color: var(--secondary-background);
    height: 80%;
    width: 70%;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 200%;
    margin-bottom: 30px;
    
`;

const List = ({ data, setShowList }) => {

    const {
        setCurrentCoordinates
    } = useContext(MainContext)

    return (
        <Wrapper>
            {
                Object.keys(data).length === 0 ?
                        <ErrorMessage >
                            Veuillez entrer un code valide
                            <Button style={{marginTop: '30px'}} onClick={() => {setShowList(false)}}>OK</Button>
                        </ErrorMessage>
                        
                    :
                    <Content>
                        <ListItem>
                            <div>
                                Name
                        </div>
                            <div>
                                Postal code
                        </div>
                            <div>
                                Longitude ; Latitude
                        </div>
                        </ListItem>
                        {Object.values(data).map((arrayElement, index) => {
                            return (
                                <ListElement
                                    key={index}
                                    data={arrayElement}
                                    setCurrentCoordinates={setCurrentCoordinates}
                                    setShowList={setShowList}
                                />
                            )
                        })}
                    </Content>

            }
        </Wrapper>
    )
}

const ListElement = ({ data, setCurrentCoordinates, setShowList }) => {

    const selectItem = () => {
        //send coordinates to the context
        const coordinates = {
            cityName: data.nom,
            lon: data.centre.coordinates[0],
            lat: data.centre.coordinates[1]
        }
        setCurrentCoordinates(coordinates)
        setShowList(false)
    }

    return (
        <ClickableListItem onClick={() => { selectItem() }}>
            <div>
                {data.nom}
            </div>
            <div>
                {data.code}
            </div>
            <div>
                {`${data.centre.coordinates[0]} ; ${data.centre.coordinates[1]}`}
            </div>
        </ClickableListItem>
    )
}


export default List