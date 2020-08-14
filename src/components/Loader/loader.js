import React from 'react';
import styled, { keyframes } from 'styled-components';
// import './loader.css';

const rotate360 = keyframes`
    0% {
        transform: rotate(0deg);
        border-left:8px solid deeppink;
    }
  
    25%{
        transform: rotate(360deg);
        border-left:8px solid gold;
    }
    
    50%{
        transform:rotate(720deg);
        border-left:8px solid palegreen;
    }
    
    75%{
        transform: rotate(1080deg);
        border-left:8px solid aqua;
    }

    100% {
        transform: rotate(1440deg);
        border-left:8px solid deeppink;
    }
`;
const Backdrop = styled.div`
    width: 125px;
    height: 125px;
    position: fixed;
    top: 35%;
    right: 0;
    bottom: 0;
    left: 45%;
    z-index: 99;
  `;
const Spinner = styled.div`
    position: absolute;
    top: calc(50% - 12.5px);
    left: calc(50% - 12.5px);

    width: 25px;
    height: 25px;
    border-top: 8px solid aliceblue;
    border-right: 8px solid aliceblue;
    border-bottom: 8px solid aliceblue;
    border-left: 8px solid #8c618d;
    border-radius: 50%;

    animation-name: ${rotate360};
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  `;
const Logo = styled.div`
    position:absolute;
    top:calc(50% + 35px);
    left:calc(50% - 25px);

    font-family:sans-serif;
    color:#000;
    letter-spacing:0.1em;
  `;


const loader = props => {
    return (
        <Backdrop>
            <Spinner />
            <Logo>loading...</Logo>
        </Backdrop>
    )
}



export default loader;
