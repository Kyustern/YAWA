import React, { useState, useContext, useRef, useEffect } from 'react'
import styled from 'styled-components';
import { ReactComponent as Temperature } from './svgs/003-temperature.svg'
import { ReactComponent as Humidity } from './svgs/014-drop.svg'
import { ReactComponent as Wind } from './svgs/013-wind.svg'
import { MainContext } from '../contexts/MainContext'
import useClickAway from '../hooks/useClickAway'
import { Transition } from 'react-transition-group';

const Nav = () => {

    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef(null)
    const squareBtnRef = useRef(null)
    const {
        currentCoordinates,
        foreCastObject,
        selection,
    } = useContext(MainContext)
    console.log("Nav -> foreCastObject", foreCastObject)

    useClickAway([menuRef, squareBtnRef],
        "click",
        () => {
            setShowMenu(false)
        })

    const lol = (nomDeLaVille) => {

        switch (nomDeLaVille) {
            case 'Nailloux':
                return ('Le vrai Sud')
            case 'La Bastide-de-Bousignac':
                return (`Coeur de l'ariège`)
            case 'Paris':
                return (`Caca`)
            default:
                return (` ${nomDeLaVille}`)
        }
    }


    return (
        <Wrapper>
            <Desc>
                {
                    lol(currentCoordinates.cityName)
                }
            </Desc>

            <MenuWrapper>
                <SquareButton ref={squareBtnRef} onMouseDown={() => { setShowMenu(!showMenu) }}>
                    {foreCastObject.arrays.parsedData[selection].designation}
                </SquareButton>
                {
                    showMenu &&
                    <FlexRack ref={menuRef}>
                        <ButtonComponent setShowMenu={setShowMenu} selectionProp='temp'>
                            <Temperature />
                            Temperature
                        </ButtonComponent>
                        <ButtonComponent setShowMenu={setShowMenu} selectionProp='humidity'>
                            <Humidity />
                            Humidity
                        </ButtonComponent>
                        <ButtonComponent setShowMenu={setShowMenu} selectionProp='wind_speed'>
                            <Wind />
                            Wind Speed
                        </ButtonComponent>
                    </FlexRack>
                }
            </MenuWrapper>
            
        </Wrapper>
    )

}

const ButtonComponent = ({ selectionProp, setShowMenu, children }) => {

    const {
        selection,
        setSelection
    } = useContext(MainContext)

    const isSelected = selection === selectionProp

    const handler = () => {
        if (!isSelected) {
            setShowMenu(false)
            setSelection(selectionProp)
        }
    }

    return (
        <Button
            style={isSelected ? {
                color: 'var(--main-accent-color)',
                borderLeft: 'solid var(--main-accent-color) 5px',
                backgroundColor: 'var(--grey)',
                fill: 'var(--main-accent-color)'
            } : null}
            // onClick={selection !== selectionProp ? () => { setSelection(selectionProp) } : null}>
            onClick={() => { handler() }}
        >
            {children}
        </Button>
    )
}

const CurrentStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(auto-fit, 1fr);
`;

const Icon = styled.div`
  
`;

const Wrapper = styled.div`
    height: 100%;
    margin: auto;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 100%;
    background-color: var(--main-background);
    font-size: 200%;
    color: white;
`;

const MenuWrapper = styled.div`
    position: relative;
    
`;

const SquareButton = styled.button`
    user-select: none;
    outline: none;
    width: 15rem;
    color: white;
    font-size: inherit;
    background-color: var(--grey);
    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: cubic-bezier(.26,.54,.38,1);
    border: 0px solid transparent;
    border-bottom: 3px solid white;
    cursor: pointer;
    ${this}:hover {
        border-bottom: 3px solid var(--main-accent-color);
    }
`;

const Desc = styled.div`
    margin-bottom: 15px;
    word-break: break-word;
`;

const Button = styled.button`
    user-select: none;
    outline: none;
    color: black;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: fit-content;
    height: auto;
    border: 0px solid #000000;
    border-left: 5px solid var(--lighter-background);
    background-color: var(--lighter-background);
    padding: 20px;
    font-size: 1.5rem;
    width: 100%;
    cursor: pointer;
    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: cubic-bezier(.26,.54,.38,1);
    ${this}:hover {
        color: var(--main-accent-color);
        background-color: var(--grey);
        border-left: solid #1878d6 5px;
        ${this}>svg{
            fill: var(--main-accent-color);
        }
    }
    ${this}>svg {
        height: 1.5rem;
        width: 1.5rem;
    }
`;


const FlexRack = styled.div`
    z-index: 999;
    margin-top: 3rem;
    background-color: var(--lighter-background);
    position: absolute;
    top: 0;
    height: auto;
    display: flex;
    flex-direction: column;
    grid-area: buttons;
    justify-content: flex-start;
    @media (max-width: 800px) {
        /* flex-direction: row; */
    }
`;

export default Nav