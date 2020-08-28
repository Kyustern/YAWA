import React from 'react'
import styled, { keyframes } from 'styled-components'

//stole this from https://loading.io/css/

const loop = keyframes`
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`

const Wrapper = styled.div`
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;

    ${this}>div {
        position: absolute;
        border: 4px solid #000;
        opacity: 1;
        border-radius: 50%;
        animation: ${loop} 0.7s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }

    ${this}>div:nth-child(3){
        animation-delay: -0.5s;
    }

`
//CL 204 CZ

export default () => <Wrapper><div/><div/></Wrapper>