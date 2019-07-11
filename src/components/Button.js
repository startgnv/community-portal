import React from 'react';
import styled from 'styled-components/macro';
import { darken } from 'polished';

const ButtonContainer = styled.button`
  display: inline-block;
  height: ${({ theme, size }) => theme.buttonSizes[size].height};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  padding: 0 30px;
  border-radius: ${({ theme, size }) => theme.buttonSizes[size].borderRadius};
  background-color: ${({ theme }) => theme.green};
  text-align: center;
  border: 0;
  outline: none;
  cursor: pointer;
  transition: 250ms;

  &:hover {
    background-color: ${({ theme }) => darken(0.1, theme.green)};
  }

  .label {
    display: inline-block;
    color: white;
    font-weight: 600;
    font-size: ${({ theme, size }) => theme.buttonSizes[size].fontSize};
  }
`;

export const Button = ({
  label = 'Button',
  className,
  fullWidth = false,
  size = 'medium',
  style = '',
  onClick = () => {}
}) => {
  return (
    <ButtonContainer
      className={className}
      fullWidth={fullWidth}
      size={size}
      onClick={onClick}
    >
      <span className="label">{label}</span>
    </ButtonContainer>
  );
};

export default Button;
