import React from 'react';
import styled from 'styled-components/macro';
import { lighten } from 'polished';
import classnames from 'classnames';

const ButtonContainer = styled.button`
  display: inline-block;
  height: ${({ theme, size }) => theme.buttonSizes[size].height};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  padding: ${({ theme, size }) => theme.buttonSizes[size].padding};
  border-radius: ${({ theme, size }) => theme.buttonSizes[size].borderRadius};
  background-color: ${({ theme }) => theme.orange};
  text-align: center;
  border: 0;
  outline: none;
  cursor: pointer;
  transition: 250ms;

  &:hover {
    background-color: ${({ theme }) => lighten(0.1, theme.orange)};
  }

  .btn-label {
    display: inline-block;
    color: white;
    font-weight: 600;
    font-size: ${({ theme, size }) => theme.buttonSizes[size].fontSize};
  }

  &.outline {
    background-color: white;
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.uiBorder};

    .btn-label {
      color: ${({ theme }) => theme.textDark};
    }

    &:hover {
      background-color: ${({ theme }) => theme.uiBackground};
    }
  }
`;

export const Button = ({
  label = 'Button',
  className,
  fullWidth = false,
  size = 'medium',
  variant = '',
  onClick = () => {}
}) => {
  const btnClasses = classnames(className, {
    [`${variant}`]: true
  });
  return (
    <ButtonContainer
      className={btnClasses}
      fullWidth={fullWidth}
      size={size}
      onClick={onClick}
    >
      <span className="btn-label">{label}</span>
    </ButtonContainer>
  );
};

export default Button;
