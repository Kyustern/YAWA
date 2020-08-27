import styled from 'styled-components';

export const Input = styled.input`
    height: 2rem;
    width: auto;
    font-size: 25px;
    text-align: center;
    font-family: 'VT323', monospace;
    color: white;
    border: solid white 0px;
    border-bottom: solid white 3px;
    background-color: #2a2a2a;
    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: cubic-bezier(.26,.54,.38,1);
    font-family: 'Nanum Gothic', sans-serif;

    /* ::placeholder {
        font-family: 'Nanum Gothic', sans-serif;
    } */

    ${this}:focus {
        border-bottom: solid #1878d6 3px;
        ::placeholder {
            color: transparent;
        }
    }
`