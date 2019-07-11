import React from 'react';
import styled from 'styled-components/macro';
import { darken } from 'polished';
import classnames from 'classnames';

const ButtonContainer = styled.button`
  display: inline-block;
  height: ${({ theme, size }) => theme.buttonSizes[size].height};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  padding: 0 20px;
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

  .btn-label {
    display: inline-block;
    color: white;
    font-weight: 600;
    font-size: ${({ theme, size }) => theme.buttonSizes[size].fontSize};
  }

  &.outline {
    background-color: transparent;
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.uiBorder};

    .btn-label {
      color: ${({ theme }) => theme.textMedium};
    }
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
  const btnClasses = classnames(className, {
    [`${style}`]: true
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
