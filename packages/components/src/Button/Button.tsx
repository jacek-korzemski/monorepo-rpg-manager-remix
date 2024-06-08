import React from 'react';
import styled, { keyframes } from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ loading, children, ...props }) => {
  return (
    <StyledButton className={loading ? 'loading' : ''} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;

const loadingAnimation = keyframes`
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
`;

const StyledButton = styled.button`
  cursor: pointer;
  margin: 0;
  padding: 0 15px;
  top: 0;
  right: 0;
  min-width: 120px;
  height: 48px;
  line-height: 48px;
  background: rgb(39, 96, 134);
  border-radius: 4px;
  font-size: 18px;
  text-align: center;
  font-weight: 400;
  color: #fff;
  border: none;
  transition: background 0.3s, box-shadow 0.3s;

  &:hover {
    background: rgb(9, 44, 85);
    box-shadow: 1px 2px 3px #222;
  }

  &.loading {
    pointer-events: none;
    background: linear-gradient(
      90deg,
      rgba(19, 66, 114, 1) 0%,
      rgba(39, 96, 134, 1) 50%,
      rgba(9, 44, 85, 1) 100%
    );
    background-size: 200% 100%;
    animation: ${loadingAnimation} 1.5s infinite linear;
    animation-direction: alternate;
    color: darkgray;
    text-shadow: 1px 1px 1px black;
    box-shadow: 1px 1px 5px black;
    opacity: 0.75;
  }
`;
