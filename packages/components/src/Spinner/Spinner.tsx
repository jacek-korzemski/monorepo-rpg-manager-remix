import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: -1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full screen height */
`;

const StyledSpinner = styled.div`
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 1s linear infinite;
`;

const Spinner = () => {
  return (
    <SpinnerWrapper>
      <StyledSpinner />
    </SpinnerWrapper>
  );
};

export default Spinner;
