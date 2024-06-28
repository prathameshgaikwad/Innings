import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounceBall = keyframes`
  from, 20%, 53%, 80%, to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -60px, 0);
  }
  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -30px, 0);
  }
  90% {
    transform: translate3d(0, -8px, 0);
  }
`;

const moveBat = keyframes`
  0% {
    transform: rotateX(0deg);
  }
  33% {
    transform: rotateX(-25deg);
  }
  100% {
    transform: rotateX(0deg);
  }
`;

const Main = styled.main`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #000; // Cricket field black
`;

const Loader = styled.div`
  position: relative;
  width: 12rem;
  height: 12rem;
  min-width: 10rem;
  min-height: 10rem;
  background-color: transparent;
`;

const Ball = styled.img`
  position: absolute;
  width: 15%;
  height: 15%;
  left: 1.5rem;
  top: 7.5rem;
  z-index: 2;
  animation: ${bounceBall} 1s infinite;
`;

const Bat = styled.svg`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  transform: rotateX(-40deg);
  animation: ${moveBat} 1s infinite;
`;

const Text = styled.p`
  margin-top: 2.5rem;
  letter-spacing: 0.1rem;
  color: #fff;
`;

const PageLoader = () => {
  return (
    <Main>
      <Loader id="loader">
        <Ball 
          src="https://cdn-icons-png.flaticon.com/128/1099/1099680.png" 
          alt="ball" 
          id="ball"
        />
        <Bat 
          id="bat" 
          viewBox="0 0 460.84737 460.84737" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m460.847656 31.75-25.070312 25.078125-31.761719-31.757813 25.082031-25.070312zm0 0" fill="#a85d5d" />
          <path d="m378.945312 50.140625 25.070313-25.070313 31.761719 31.757813-25.070313 25.070313zm0 0" fill="#7f4545" />
          <path d="m353.878906 75.210938 25.066406-25.070313 31.761719 31.757813-25.070312 25.070312zm0 0" fill="#a85d5d" />
          <path d="m328.808594 100.28125 25.066406-25.070312 31.761719 31.757812-25.070313 25.070312zm0 0" fill="#7f4545" />
          <path d="m360.566406 132.039062-25.078125 25.070313-31.75-31.75 25.070313-25.078125zm0 0" fill="#a85d5d" />
          <path d="m352.425781 190.320312-260.136719 260.140626c-13.847656 13.847656-36.296874 13.847656-50.140624 0l-31.761719-31.761719c-13.847657-13.84375-13.847657-36.296875 0-50.140625l260.140625-260.136719 25.070312 25.066406-.21875.222657-76.050781 107.808593 107.808594-76.050781.21875-.21875zm0 0" fill="#ffd2a6" />
          <path d="m327.355469 165.25-.21875.21875-107.808594 76.050781 76.050781-107.808593.21875-.222657zm0 0" fill="#7f4545" />
        </Bat>
      </Loader>
      <Text>
        LOADING...
      </Text>
    </Main>
  );
};

export default PageLoader;