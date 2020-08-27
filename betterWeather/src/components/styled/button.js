import styled from 'styled-components';

const Butt = styled.div`
user-select: none;
width: fit-content;
margin-left: auto;
margin-right: auto;
margin-bottom: 10px;
font-size: iherit;
padding: 4px;
border: none;
color: var(--main-background);
background-color: transparent;
${this}:hover {
    color: white;
    background-color: var(--main-background);
    cursor: pointer;
}
`

export default Butt